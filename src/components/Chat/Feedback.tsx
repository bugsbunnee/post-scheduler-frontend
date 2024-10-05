import React from 'react';
import Error from '../Error';

import { Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { BiInfoCircle } from 'react-icons/bi';

import { saveFeedback } from '../../services/chat';

const schema = z.object({
    subject: z.string().min(3, 'Subject must be at least 3 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters')
});

type FeedbackData = z.infer<typeof schema>;

const Feedback: React.FC = () => {
    const { register, formState, handleSubmit, reset } = useForm<FeedbackData>({
        resolver: zodResolver(schema),
        mode: 'all'
    });

    const mutation = useMutation({ 
        mutationFn: saveFeedback,
    });

    const onSaveFeedback = async (feedback: FeedbackData) => {
        mutation.mutate(feedback);
        reset();
    };

    return ( 
        <form id='login-form' className='mt-4 p-3 w-full shadow-md rounded-lg border border-gray-200 bg-white text-black gap-4' onSubmit={handleSubmit(onSaveFeedback)}>
            {mutation.isError && <Error error='Could not get your feedback at this time. Please try again later...' />}

            {mutation.isSuccess && (
                <div className="bg-green-100 p-3 mb-4 rounded-md flex flex-row items-center justify-center text-green-600 gap-2">
                    <BiInfoCircle  />
                    <div className="text-xs flex-1 text-left">Feedback saved successfully!</div>
                </div>
            )}

            <div>
                <label htmlFor="subject" className="text-black text-sm">Leave us a feedback or suggestion</label>
                <input 
                    type="text" 
                    className='w-full py-2 px-4 bg-white border border-gray-200 mt-2 rounded-md focus:outline-none text-sm' 
                    placeholder='Enter suggestion here'
                    {...register('subject')} 
                />
                {formState.errors.subject && <div className="text-red-400 text-sm font-semibold mt-2">{formState.errors.subject.message}</div>}
            </div>
            
            <div className='mt-4'>
                <label htmlFor="message" className="text-black text-sm">Leave more details below</label>
                <input 
                    type="text" 
                    className='w-full py-2 px-4 bg-white border border-gray-200 mt-2 rounded-md focus:outline-none text-sm' 
                    placeholder='Enter details here'
                    {...register('message')} 
                />
                {formState.errors.message && <div className="text-red-400 text-sm font-semibold mt-2">{formState.errors.message.message}</div>}
            </div>

            <button disabled={mutation.isPending} className='bg-black text-white text-sm w-full rounded-lg p-3 mt-4' type='submit'>
                {mutation.isPending ? <Spinner /> : 'Submit'}
            </button>
        </form>
    );
};
 
export default Feedback;