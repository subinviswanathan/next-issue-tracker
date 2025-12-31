/* eslint-disable react/jsx-no-undef */
'use client';

import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const onSubmit = async (data: IssueForm) => {
		setError('');
		setIsSubmitting(true);
		try {
			console.log(data);
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setError('Failed to create issue');
			console.error('Failed to create issue:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{error && (
				<Callout.Root color='red' className='max-w-xl mb-5'>
					<Callout.Icon>{/* <InfoCircledIcon /> */}</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				className='max-w-xl space-y-3'
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField.Root placeholder='Title' {...register('title')} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				></Controller>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					Submit New Issue {isSubmitting && <Spinner />}
				</Button>
			</form>
		</>
	);
};

export default NewIssuePage;
