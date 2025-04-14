import { useRouter } from 'next/navigation';

import useAuthStore from '@/stores/authStore';

const useLogOut = () => {
	const router = useRouter();
	const { logOut } = useAuthStore();

	const handleLogOut = async () => {
		try {
			await logOut();
			router.push('/login');
		} catch (error) {
			console.error('Error logging out:', error.message);
		}
	};

	return handleLogOut;
};

export default useLogOut;
