import React from 'react';
import Upload from '../components/UploadField';
import Input from '../components/Input';
import Button from '../components/Button';
import { Tile as TileType } from '../types/apiTypes';
import { useNavigate, useParams } from 'react-router';
import { onImageChange, onChangeFunc } from '../hooks/useImageUpload';

const UploadComponent: React.FC<TileType> = ({ name, url, category }) => {
  const { id } = useParams();
  const [img, setImg] = React.useState<File | undefined>(undefined);
  const [newName, setNewName] = React.useState<string>('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [newCategory, setNewCategory] = React.useState<string>('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const formData = new FormData();
    newName !== '' && formData.append('name', newName);
    newCategory !== '' && formData.append('category', newCategory);
    img !== undefined && formData.append('file', img as File);
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.status === 200) {
        console.log('success');
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='w-full h-auto mx-auto flex justify-center align-middle'>
      <div className='w-full mx-6 my-16 tablet:border border-black max-w-4xl '>
        <div className='tablet:w-full tablet:flex tablet:flex-row tablet:justify-around '>
          <div className='my-12 mx-6 flex flex-col justify-center align-middle'>
            {url !== undefined && <Upload onImageChange={(e) => onImageChange(e, setImg)} />}
            <div className='mt-3 flex flex-col'>
              {name !== undefined && (
                <Input
                  label='Name'
                  value={newName}
                  placeHolder={name}
                  onChange={(e) => onChangeFunc(e, setNewName)}
                />
              )}
              {category !== undefined && (
                <Input
                  label='Category'
                  value={newCategory}
                  placeHolder={category}
                  onChange={(e) => onChangeFunc(e, setNewCategory)}
                />
              )}
            </div>
          </div>
          <div className='hidden tablet:block'>
            <div className='border border-black min-w-fit h-fit flex justify-center align-middle max-w-sm my-12'>
              {img ? (
                <img
                  className='w-[200px] h-[268px]  object-contain'
                  src={URL.createObjectURL(img)}
                />
              ) : (
                <img className='w-[200px] h-[268px] object-contain' src={url} />
              )}
            </div>
          </div>
        </div>
        <div className='mx-10 flex flex-col justify-center align-middle tablet:justify-end tablet:mx-20 tablet:mb-6'>
          <Button buttonText='Update' clickFunction={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
