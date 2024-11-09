import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { EducationalContent } from '../../../types/education';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import ContentList from './ContentList';
import ContentGrid from './ContentGrid';
import ContentModal from './ContentModal';

export default function EducationManager() {
  const [content, setContent] = useState<EducationalContent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const q = query(collection(db, 'educational-content'));
    const snapshot = await getDocs(q);
    const contentList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as EducationalContent));
    setContent(contentList);
  };

  const handleAddContent = async (newContent: Omit<EducationalContent, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'educational-content'), {
        ...newContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      await fetchContent();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding content:', error);
    }
  };

  const handleUpdateContent = async (id: string, updatedContent: Partial<EducationalContent>) => {
    try {
      const contentRef = doc(db, 'educational-content', id);
      await updateDoc(contentRef, {
        ...updatedContent,
        updatedAt: new Date().toISOString()
      });
      await fetchContent();
      setIsModalOpen(false);
      setSelectedContent(null);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) return;
    
    try {
      await deleteDoc(doc(db, 'educational-content', id));
      await fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion du Contenu Éducatif</h2>
        <button
          onClick={() => {
            setSelectedContent(null);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Nouveau Contenu</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous</option>
              <option value="article">Articles</option>
              <option value="video">Vidéos</option>
              <option value="quiz">Quiz</option>
              <option value="infographic">Infographies</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <ContentGrid
          content={filteredContent}
          onEdit={(content) => {
            setSelectedContent(content);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteContent}
        />
      ) : (
        <ContentList
          content={filteredContent}
          onEdit={(content) => {
            setSelectedContent(content);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteContent}
        />
      )}

      <ContentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContent(null);
        }}
        content={selectedContent}
        onSubmit={selectedContent ? 
          (data) => handleUpdateContent(selectedContent.id, data) : 
          handleAddContent
        }
      />
    </div>
  );
}