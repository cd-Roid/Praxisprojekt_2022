import React from 'react';

type UploadProps = {
  backgroundUrl: string;
};

const Upload: React.FC<UploadProps> = ({ backgroundUrl }) => {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${backgroundUrl})`,
      //  'flex items-center justify-center w-56 bg-contain bg-no-repeat bg-center bg-[image:url(https://i.ibb.co/8M0jgv1/When.png)]  '
      // }}
      className={
        'flex items-center justify-center min-w-56 max-w-xs bg-contain bg-no-repeat bg-center tablet:bg-none'
      }
    >
      <label className='flex flex-col w-full h-32 border-2 border-black border-dashed hover:bg-gray-100 hover:border-gray-300'>
        <div className='flex flex-col items-center justify-center pt-7'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-8 h-8 text-black group-hover:text-gray-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            />
          </svg>
          <p className='pt-1 text-sm tracking-wider text-black group-hover:text-gray-600'>
            Attach a file
          </p>
        </div>
        <input type='file' className='opacity-0' />
      </label>
    </div>
  );
};

export default Upload;
