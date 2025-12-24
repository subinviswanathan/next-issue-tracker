'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
	const currentPath = usePathname(); // to trigger re-render on path change
	const links = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/issues', label: 'Issues' },
	];

	return (
		<nav className='flex space-x-6 border mb-5 px-5 py-3 items-center'>
			<Link href='/'>
				<AiFillBug className='text-xl' />
			</Link>
			<ul className='flex space-x-6'>
				{links.map(({ href, label }) => (
					<li key={label}>
						<Link
							className={`hover:text-zinc-300 transition-colors ${
								currentPath === href ? 'text-zinc-500' : ''
							}`}
							href={href}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
