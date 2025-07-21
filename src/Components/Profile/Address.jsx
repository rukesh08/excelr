import React, { useState } from 'react';
import { TextField, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { updateUserAddress } from '../State/Authentication/Action';

const Address = ({ addresses }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editableAddress, setEditableAddress] = useState({});
  const dispatch = useDispatch();
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditableAddress({ ...addresses[index] });
  };

  const handleChange = (e) => {
    setEditableAddress({ ...editableAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
     dispatch(updateUserAddress(editableAddress));
     setEditIndex(null);
  };

  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No address available
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {addresses.map((address, index) => (
        <div
          key={index}
          className="bg-orange-700 rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-300 relative"
        >
          <div className="absolute top-2 right-2">
            {editIndex === index ? (
              <IconButton onClick={handleSave}>
                <SaveIcon className="text-green-600" />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleEdit(index)}>
                <EditIcon className="text-gray-50" />
              </IconButton>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-4">Address {index + 1}</h2>

          {editIndex === index ? (
            <>
              <TextField
                fullWidth
                label="Street"
                name="street"
                variant="outlined"
                size="small"
                className="mb-2"
                value={editableAddress.street || ''}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                variant="outlined"
                size="small"
                className="mb-2"
                value={editableAddress.city || ''}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                variant="outlined"
                size="small"
                className="mb-2"
                value={editableAddress.state || ''}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Country"
                name="country"
                variant="outlined"
                size="small"
                className="mb-2"
                value={editableAddress.country || ''}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                variant="outlined"
                size="small"
                value={editableAddress.postalCode || ''}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <p><span className="font-medium">Street:</span> {address.street || 'N/A'}</p>
              <p><span className="font-medium">City:</span> {address.city || 'N/A'}</p>
              <p><span className="font-medium">State:</span> {address.state || 'N/A'}</p>
              <p><span className="font-medium">Country:</span> {address.country || 'N/A'}</p>
              <p><span className="font-medium">Postal Code:</span> {address.postalCode || 'N/A'}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Address;
