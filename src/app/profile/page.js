
'use client';
// import EditableImage from "@/components/layout/EditableImage";
// import InfoBox from "@/components/layout/InfoBox";
// import SuccessBox from "@/components/layout/SuccessBox";
// import UserForm from "@/components/layout/UserForm";
import Form from '@/components/layout/Form'

// import Tabs from "@/components/layout/UserTabs";
import Tab from '@/components/layout/Tab'
import {useSession} from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import EditableImage from '../Editableimage'
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState(null);
  const [isadmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (response.ok)
        resolve()
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });

  }
  

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <Tab isadmin={isadmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <Form user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}