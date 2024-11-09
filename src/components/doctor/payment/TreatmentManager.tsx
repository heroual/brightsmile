import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2 } from 'lucide-react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { TreatmentType } from '../../../types/payment';

interface TreatmentManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TreatmentManager({ isOpen, onClose }: TreatmentManagerProps) {
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    basePrice: 0,
    description: '',
    category: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTreatments();
    }
  }, [isOpen]);

  const fetchTreatments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'treatments'));
      const treatmentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TreatmentType[];
      setTreatments(treatmentList);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, 'treatments', editingId), formData);
      } else {
        await addDoc(collection(db, 'treatments'), formData);
      }
      
      await fetchTreatments();
      setFormData({ name: '', basePrice: 0, description: '', category: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving treatment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (treatment: TreatmentType) => {
    setFormData({
      name: treatment.name,
      basePrice: treatment.basePrice,
      description: treatment.description,
      category: treatment.category
    });
    setEditingId(treatment.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce traitement ?')) return;

    try {
      await deleteDoc(doc(db, 'treatments', id));
      await fetchTreatments();
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div <boltAction type="file" filePath="src/components/doctor/payment/TreatmentManager.tsx">        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg max-w-4xl w-full">
          <div className="absolute right-0 top-0 p-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Gérer les Traitements
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom du traitement</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix de base (MAD)</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="consultation">Consultation</option>
                  <option value="surgery">Chirurgie</option>
                  <option value="cleaning">Nettoyage</option>
                  <option value="orthodontics">Orthodontie</option>
                  <option value="implants">Implants</option>
                  <option value="aesthetic">Esthétique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', basePrice: 0, description: '', category: '' });
                      setEditingId(null);
                    }}
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler la modification
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Liste des traitements</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {treatments.map((treatment) => (
                      <tr key={treatment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {treatment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {treatment.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {treatment.basePrice.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'MAD'
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {treatment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(treatment)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(treatment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}