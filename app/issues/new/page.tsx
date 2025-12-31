/* eslint-disable react/jsx-no-undef */
'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
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
		try {
			console.log(data);
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setError('Failed to create issue');
			console.error('Failed to create issue:', error);
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
				{errors.title && (
					<Text color='red' as='p' className='pb-3'>
						{errors.title.message}
					</Text>
				)}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				></Controller>
				{errors.description && (
					<Text color='red' as='p' className='pb-3'>
						{errors.description.message}
					</Text>
				)}
				<Button>Submit New Issue</Button>
			</form>
		</>
	);
};

export default NewIssuePage;
