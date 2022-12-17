import React from 'react';
import Upload from '../components/UploadField';
import Input from '../components/Input';
import Button from '../components/Button';
import useImageUpload from '../hooks/useImageUpload';
import { useToast } from '../hooks/useToast';

const UploadComponent: React.FC = () => {
  const [img, setImg] = React.useState<File | undefined>(undefined);
  const [name, setName] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { notify } = useToast();
  const { onImageChange, onChangeFunc } = useImageUpload();

  const handleSubmit = async () => {
    if (!img) {
      notify('error', 'Please upload a png file first', false);
      return;
    }
    if (!name) {
      notify('error', 'Please enter a name', false);
      return;
    }
    if (!category) {
      notify('error', 'Please enter a category', false);
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('file', img as File);
    try {
      const response = await fetch(`${backendUrl}`, {
        method: 'POST',
        body: formData,
      });
      if (response.status === 200) {
        notify('success', 'Tile successfully added');
      }
    } catch (error) {
      notify('error', 'Something went wrong');
    }
  };

  return (
    <div className='w-full h-auto mx-auto flex justify-center align-middle'>
      <div className='w-full mx-6 my-16 tablet:border border-black max-w-4xl '>
        <div className='tablet:w-full tablet:flex tablet:flex-row tablet:justify-around '>
          <div className='my-12 mx-6 flex flex-col justify-center align-middle'>
            <Upload onImageChange={(e) => onImageChange(e, setImg)} />
            <div className='mt-3 flex flex-col'>
              <Input
                required={true}
                label='Name'
                value={name}
                placeHolder='Name'
                onChange={(e) => onChangeFunc(e, setName)}
              />
              <Input
                required={true}
                label='Category'
                value={category}
                placeHolder='Category'
                onChange={(e) => onChangeFunc(e, setCategory)}
              />
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
                <img className='w-[200px] h-[268px] object-contain' />
              )}
            </div>
          </div>
        </div>
        <div className='mx-10 flex flex-col justify-center align-middle tablet:justify-end tablet:mx-20 tablet:mb-6'>
          <Button buttonText='Upload' clickFunction={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
