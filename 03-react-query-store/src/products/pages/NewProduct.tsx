import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useProductMutation } from '..';

interface FormInputs {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const productMutation = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: 'Teclado',
      price: 150.22,
      description:
        'Elit et anim nostrud incididunt occaecat minim et. Tempor eiusmod elit amet magna nulla occaecat do laboris laboris aliquip consequat incididunt. Ad nulla excepteur eu est irure in do pariatur fugiat elit. Consequat in laborum veniam culpa commodo mollit quis enim ut sit do cupidatat non. Lorem eu cillum officia consectetur elit ut id. Tempor do laborum amet esse aliquip nisi ullamco. Nostrud enim ipsum ex eu reprehenderit amet.',
      category: "men's clothing",
      image:
        'https://falabella.scene7.com/is/image/FalabellaCO/gsc_120676509_2762645_1?wid=800&hei=800&qlt=70',
    },
  });

  const newImage = watch('image');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // console.log(data);
    productMutation.mutate(data);
  };
  return (
    <div className='w-full flex-col'>
      <h1 className='text-2xl font-bold'>Nuevo producto</h1>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-around items-center'>
          <div className='flex-col w-[500px]'>
            <Controller
              control={control}
              name='title'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='text'
                  label='Titulo del producto'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name='price'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                  onBlur={field.onBlur}
                  className='mt-2'
                  type='number'
                  label='Precio del producto'
                />
              )}
            />

            <Controller
              control={control}
              name='image'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className='mt-2'
                  type='url'
                  label='Url del producto'
                />
              )}
            />
            <Controller
              control={control}
              name='description'
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onChange}
                  className='mt-2'
                  label='Descripcion del producto'
                />
              )}
            />

            <Controller
              control={control}
              name='category'
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onChange}
                  className='rounded-md p-3 mt-2 bg-gray-800 w-full'
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value='jewelery'>Jewelery</option>
                  <option value='electronics'>Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              isDisabled={productMutation.isPending}
              type='submit'
              className='mt-2'
              color='primary'
            >
              {productMutation.isPending ? 'Loading...' : 'Create'}
            </Button>
          </div>

          <div
            className='bg-white rounded-2xl p-10 flex items-center'
            style={{
              width: '500px',
              height: '600px',
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
