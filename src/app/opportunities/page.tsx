import { redirect } from 'next/navigation';

// Redirect /opportunities to /explore for backward compatibility
export default function OpportunitiesRedirect() {
    redirect('/explore');
}
