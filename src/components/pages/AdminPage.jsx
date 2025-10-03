import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

const STORAGE_BUCKET = 'gallery'; // ⬅️ change to your actual bucket name if different

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('data'); // 'data', 'administrasi', or 'gallery'

  // shared
  const [loading, setLoading] = useState(false);

  // ---------- Statistics ----------
  const [dataLoading, setDataLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    id: null,
    total_population: 0,
    total_rw: 1,
    total_rt: 4,
    total_facilities: 0,
    total_mosques: 0
  });

  // ---------- Organization ----------
  const [organizationLoading, setOrganizationLoading] = useState(true);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  // ---------- Gallery Items ----------
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null); // null or item object
  const [filePreviewURL, setFilePreviewURL] = useState(null); // preview for selected image file
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (activeTab === 'data') {
      fetchCurrentStatistics();
    } else if (activeTab === 'administrasi') {
      fetchOrganizationMembers();
    } else if (activeTab === 'gallery') {
      fetchGalleryItems();
    }
  }, [activeTab]);

  // ===== Organization =====
  const fetchOrganizationMembers = async () => {
    setOrganizationLoading(true);
    try {
      const { data, error } = await supabase
        .from('organization_structure')
        .select('*')
        .order('position');

      if (error) throw error;
      setOrganizationMembers(data || []);
    } catch (error) {
      console.error('Error fetching organization members:', error);
      alert('Failed to load organization members');
    } finally {
      setOrganizationLoading(false);
    }
  };

  const handleAddMember = async (memberData) => {
    try {
      const { error } = await supabase.from('organization_structure').insert([memberData]);
      if (error) throw error;
      fetchOrganizationMembers();
      alert('Member added successfully!');
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member');
    }
  };

  const handleUpdateMember = async (id, updates) => {
    try {
      const { error } = await supabase.from('organization_structure').update(updates).eq('id', id);
      if (error) throw error;
      fetchOrganizationMembers();
      alert('Member updated successfully!');
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update member');
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      const { error } = await supabase.from('organization_structure').delete().eq('id', id);
      if (error) throw error;
      fetchOrganizationMembers();
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member');
    }
  };

  // ===== Statistics =====
  const fetchCurrentStatistics = async () => {
    setDataLoading(true);
    try {
      const { data, error } = await supabase
        .from('village_statistics')
        .select('id, total_population, total_rw, total_rt, total_facilities, total_mosques')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      alert('Failed to load current statistics');
    } finally {
      setDataLoading(false);
    }
  };

  const handleStatisticsChange = (e) => {
    const { name, value } = e.target;
    setStatistics((prev) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0
    }));
  };

  const handleUpdateStatistics = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        total_population: statistics.total_population,
        total_rw: statistics.total_rw,
        total_rt: statistics.total_rt,
        total_facilities: statistics.total_facilities,
        total_mosques: statistics.total_mosques
      };

      let error;
      if (statistics.id) {
        ({ error } = await supabase.from('village_statistics').update(payload).eq('id', statistics.id));
      } else {
        ({ error } = await supabase.from('village_statistics').insert([payload]));
      }
      if (error) throw error;

      alert('Statistics updated successfully!');
      fetchCurrentStatistics();
    } catch (error) {
      console.error('Error updating statistics:', error);
      alert('Failed to update statistics');
    } finally {
      setLoading(false);
    }
  };

  // ===== Gallery CRUD =====
  const fetchGalleryItems = async () => {
    setGalleryLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('id, title, description, image_url, category, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      alert('Failed to load gallery items');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Upload an image file to Supabase Storage and return its public URL
  const uploadImageAndGetPublicURL = async (file) => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `images/${fileName}`; // organize uploads under /images

    const { error: uploadError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'image/jpeg'
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    // data.publicUrl is the signed-less public URL (bucket must be public / or has public policy)
    return { publicUrl: data.publicUrl, path: filePath };
  };

  const handleAddGalleryItem = async (item, file) => {
    try {
      setUploadingImage(true);
      let image_url = '';
      if (file) {
        const { publicUrl } = await uploadImageAndGetPublicURL(file);
        image_url = publicUrl;
      }

      const payload = { ...item, image_url }; // table has: title, description, image_url, category
      const { error } = await supabase.from('gallery_items').insert([payload]);
      if (error) throw error;

      await fetchGalleryItems();
      alert('Gallery item added successfully!');
    } catch (error) {
      console.error(error.message, error); 
      alert(error.message || 'Failed to add gallery item');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdateGalleryItem = async (id, updates, newFile, currentImageUrl) => {
    try {
      setUploadingImage(true);
      let image_url = currentImageUrl || '';

      // If a new file was selected, upload it and override image_url
      if (newFile) {
        const { publicUrl } = await uploadImageAndGetPublicURL(newFile);
        image_url = publicUrl;
        // (Optional) You can delete the old file from storage if you also store the path.
        // Since the table only keeps image_url, we skip deletion here.
      }

      const payload = { ...updates, image_url };

      const { error } = await supabase.from('gallery_items').update(payload).eq('id', id);
      if (error) throw error;

      await fetchGalleryItems();
      alert('Gallery item updated successfully!');
    } catch (error) {
      console.error('Error updating gallery item:', error);
      alert(error.message || 'Failed to update gallery item');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
      await fetchGalleryItems();
      alert('Gallery item deleted successfully!');
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Failed to delete gallery item');
    }
  };

  // For file preview
  const onChangeFile = (file) => {
    if (!file) {
      setFilePreviewURL(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFilePreviewURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-white shadow-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <h1 className="text-2xl font-semibold text-blue-700">Dashboard Admin</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-blue-100 mb-6">
          <nav className="-mb-px flex gap-6">
            <button
              onClick={() => setActiveTab('data')}
              className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors rounded-t-lg ${
                activeTab === 'data'
                  ? 'border-blue-600 text-blue-700 bg-blue-50'
                  : 'border-transparent text-blue-500 hover:text-blue-700 hover:border-blue-300 bg-white'
              }`}
            >
              Data Management
            </button>
            <button
              onClick={() => setActiveTab('administrasi')}
              className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors rounded-t-lg ${
                activeTab === 'administrasi'
                  ? 'border-blue-600 text-blue-700 bg-blue-50'
                  : 'border-transparent text-blue-500 hover:text-blue-700 hover:border-blue-300 bg-white'
              }`}
            >
              Administrasi Management
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors rounded-t-lg ${
                activeTab === 'gallery'
                  ? 'border-blue-600 text-blue-700 bg-blue-50'
                  : 'border-transparent text-blue-500 hover:text-blue-700 hover:border-blue-300 bg-white'
              }`}
            >
              Gallery Management
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'data' ? (
            // ===== Data Management =====
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-blue-900">Update Statistics</h2>
                {dataLoading && (
                  <div className="text-blue-600 text-sm font-medium">Loading latest data...</div>
                )}
              </div>

              <form onSubmit={handleUpdateStatistics} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { name: 'total_population', label: 'Total Population' },
                    { name: 'total_rw', label: 'Total RW' },
                    { name: 'total_rt', label: 'Total RT' },
                    { name: 'total_facilities', label: 'Total Facilities' },
                    { name: 'total_mosques', label: 'Total Mosques' }
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-blue-700 mb-2">
                        {f.label}
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={f.name}
                        value={statistics[f.name]}
                        onChange={handleStatisticsChange}
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-black"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow-md"
                  >
                    {loading ? 'Updating...' : 'Update Statistics'}
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === 'administrasi' ? (
            // ===== Organization Management =====
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-blue-900">Organization Structure</h2>
                {organizationLoading && (
                  <div className="text-blue-600 text-sm font-medium">Loading members...</div>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setEditingMember({})}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
                  >
                    Add New Member
                  </button>
                </div>

                <div className="overflow-hidden shadow ring-1 ring-blue-100 rounded-lg">
                  <table className="min-w-full divide-y divide-blue-100">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-blue-800">
                          Name
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-blue-800">
                          Position
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100 bg-white">
                      {organizationLoading ? (
                        <tr>
                          <td colSpan="3" className="px-3 py-4 text-center text-blue-600">
                            Loading organization members...
                          </td>
                        </tr>
                      ) : organizationMembers.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="px-3 py-4 text-center text-blue-600">
                            No members added yet. Click &quot;Add New Member&quot; to add one.
                          </td>
                        </tr>
                      ) : (
                        organizationMembers.map((member) => (
                          <tr key={member.id}>
                            <td className="py-4 pl-4 pr-3 text-sm text-blue-700">{member.name}</td>
                            <td className="px-3 py-4 text-sm text-blue-700">{member.position}</td>
                            <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium space-x-2">
                              <button
                                onClick={() => setEditingMember(member)}
                                className="inline-flex items-center px-3 py-1 rounded-md border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="inline-flex items-center px-3 py-1 rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            // ===== Gallery Management (CRUD with file upload) =====
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-blue-900">Gallery Management</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchGalleryItems}
                    className="px-3 py-2 rounded-md border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    disabled={galleryLoading}
                  >
                    {galleryLoading ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingGalleryItem({
                        title: '',
                        category: '',
                        image_url: '',
                        description: ''
                      });
                      setFilePreviewURL(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
                  >
                    Add New Item
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-100">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Preview</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Created</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-blue-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100 bg-white">
                    {galleryLoading ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-6 text-center text-blue-600">
                          Loading gallery items...
                        </td>
                      </tr>
                    ) : galleryItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-6 text-center text-blue-600">
                          No gallery items yet. Click &quot;Add New Item&quot; to create one.
                        </td>
                      </tr>
                    ) : (
                      galleryItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.title || 'preview'}
                                className="w-20 h-14 object-cover rounded"
                              />
                            ) : (
                              <div className="w-20 h-14 rounded bg-gray-200" />
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-blue-900">{item.title}</td>
                          <td className="px-4 py-3 text-sm text-blue-900">{item.description}</td>
                          <td className="px-4 py-3 text-sm text-blue-900">
                            {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
                          </td>
                          <td className="px-4 py-3 text-right text-sm">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingGalleryItem(item);
                                  setFilePreviewURL(null);
                                }}
                                className="px-3 py-1 rounded-md border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryItem(item.id)}
                                className="px-3 py-1 rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Member Edit Dialog */}
        {editingMember && (
          <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                {editingMember.id ? 'Edit Member' : 'Add New Member'}
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = {
                    name: formData.get('name'),
                    position: formData.get('position')
                  };

                  if (editingMember.id) {
                    handleUpdateMember(editingMember.id, data);
                  } else {
                    handleAddMember(data);
                  }
                  setEditingMember(null);
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingMember.name || ''}
                      required
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-black"
                      placeholder="Enter member name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Position</label>
                    <input
                      type="text"
                      name="position"
                      defaultValue={editingMember.position || ''}
                      required
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-black"
                      placeholder="Enter position"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
                  >
                    {editingMember.id ? 'Save Changes' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Item Dialog (with file upload) */}
        {editingGalleryItem && (
          <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                {editingGalleryItem.id ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);

                  const payload = {
                    title: formData.get('title'),
                    category: formData.get('category'),
                    description: formData.get('description')
                  };

                  const file = formData.get('image_file'); // File or null
                  const fileToUpload = file && file.size ? file : null;

                  if (editingGalleryItem.id) {
                    await handleUpdateGalleryItem(
                      editingGalleryItem.id,
                      payload,
                      fileToUpload,
                      editingGalleryItem.image_url || ''
                    );
                  } else {
                    await handleAddGalleryItem(payload, fileToUpload);
                  }

                  setEditingGalleryItem(null);
                  setFilePreviewURL(null);
                  form.reset();
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={editingGalleryItem.title || ''}
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-black"
                      placeholder="e.g. Kerja Bakti RT 01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Image</label>
                    <input
                      type="file"
                      name="image_file"
                      accept="image/*"
                      className="block w-full text-sm text-blue-900
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-md file:border-0
                                 file:text-sm file:font-medium
                                 file:bg-blue-50 file:text-blue-700
                                 hover:file:bg-blue-100"
                      onChange={(e) => onChangeFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-blue-600 mt-1">
                      Choose an image to upload to Supabase Storage. If omitted, the existing image (on edit) will be kept.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={editingGalleryItem.description || ''}
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-black"
                      placeholder="Deskripsi singkat..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-blue-800 mb-2">Preview</p>
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {filePreviewURL ? (
                        <img src={filePreviewURL} alt="preview" className="w-full h-full object-cover" />
                      ) : editingGalleryItem.image_url ? (
                        <img
                          src={editingGalleryItem.image_url}
                          alt="current"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image selected</span>
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-blue-900">
                        {editingGalleryItem.title || '—'}
                      </div>
                      <div className="text-blue-700">{editingGalleryItem.category || '—'}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingGalleryItem(null);
                      setFilePreviewURL(null);
                    }}
                    className="px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md disabled:bg-blue-400"
                  >
                    {uploadingImage
                      ? 'Saving...'
                      : editingGalleryItem.id
                      ? 'Save Changes'
                      : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
