import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../Input';
import Button from '../../../Button';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function DiscountForm({ action, code, addDiscount, editDiscount }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      code: code?.code || '',
      percentage: code?.percentage || 0,
      expires: code?.expires || '',
    }
  });
  
  const [expiryDate, setExpiryDate] = useState(code?.expires || '');

  useEffect(() => {
    // If editing, pre-fill form fields with provided `code` data
    if (code) {
      setValue('code', code.code);
      setValue('percentage', code.percentage);
      setValue('expires', code.expires);
    }
  }, [code, setValue]);

  const onSubmit = async (data) => {
    try {
        if (action === 'add') {
            await addDiscount(data);
        } else if (action === 'edit') {
            await editDiscount(code.code, data)
        }
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='p-4'>
      {/* Code Input */}
      <Input
        type="text"
        inputName='Kodas'
        placeholder='Kodas'
        register={register('code')}
        error={errors.code?.message as string}
      />

      {/* Percentage Input */}
      <Input
        type="number"
        inputName='Procentai'
        placeholder='Procentai'
        register={register('percentage')}
        error={errors.percentage?.message as string}
      />

      {/* Expiry Date Input */}
      <div className="flex flex-col gap-0.5 mb-12">
        <label 
          className="
            text-base font-semibold ml-2 bg-clip-text text-transparent rounded-full
            bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
          "
        >
          Galiojimo data
        </label>

            <div 
                className={`
                    w-full h-min p-0.5 flex gap-0.5 rounded-full
                    bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                `}
            >
                <div 
                    className={`
                        grow h-full overflow-hidden flex rounded-full
                        dark:bg-[#3b2d2b] dark:hover:bg-[#66564c] hover:bg-[#F2CEA9] bg-[#EFD8BF]
                    `}
                >
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => {
                      setExpiryDate(e.target.value);
                      setValue('expires', e.target.value);
                    }}
                    className='w-full grow px-4 py-2 bg-transparent outline-none dark:text-white'
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setExpiryDate('');
                      setValue('expires', '');
                    }}
                    className='pr-4 pl-2'
                  >
                    <Icon icon="tabler:x" className="w-6 h-6 dark:text-[#ccc5c3] text-[#66564c] active:scale-75 transition-[transform,color]"/>
                  </button>
                </div>
            </div>
      </div>

      {/* Submit Button */}
      <Button type='submit' onClick={handleSubmit(onSubmit)} icon={action === 'add' ? 'tabler:plus' : 'tabler:edit'}>{action === 'add' ? 'Prideti' : 'Atnaujinti'}</Button>
    </div>
  );
};
