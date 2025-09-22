import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [editing, setEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.displayName || '',
        email: user.email || '',
        phone: localStorage.getItem(`${user.uid}_phone`) || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      localStorage.setItem(`${user.uid}_phone`, userData.phone);
    }
    setEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    setPasswords({ current: '', new: '', confirm: '' });
    setPasswordError('');
    alert('Password updated successfully!');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border border-gray-400 rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">My Profile</h1>

      <div className="flex border-b border-gray-400 mb-6">
        <button
          className={`px-4 py-2 ${activeTab === 'personal' ? 'border-b-2 border-black font-medium text-black' : 'text-gray-600'}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'security' ? 'border-b-2 border-black font-medium text-black' : 'text-gray-600'}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {activeTab === 'personal' && (
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <div>
            <label className="block mb-1 font-medium text-black">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 rounded border ${
                editing ? 'border-black bg-white text-black' : 'border-gray-400 bg-gray-100 text-gray-600'
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              disabled ={!editing}
              className={`w-full px-4 py-2 rounded border ${
                editing ? 'border-black bg-white text-black' : 'border-gray-400 bg-gray-100 text-gray-600'
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 rounded border ${
                editing ? 'border-black bg-white text-black' : 'border-gray-400 bg-gray-100 text-gray-600'
              }`}
            />
          </div>

          {!editing ? (
            <button
              className="mt-4 w-32 self-center border border-black text-black font-medium py-2 rounded"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-4 mt-4 justify-center">
              <button
                className="border border-black text-black py-2 px-6 rounded hover:bg-black hover:text-white transition"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="border border-gray-400 text-black py-2 px-6 rounded hover:bg-gray-400 hover:text-white transition"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <div>
            <label className="block mb-1 font-medium text-black">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-4 py-2 rounded border border-gray-400 bg-gray-100 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">New Password</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full px-4 py-2 rounded border border-gray-400 bg-gray-100 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Confirm Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-4 py-2 rounded border border-gray-400 bg-gray-100 text-black"
            />
          </div>

          {passwordError && <p className="text-red-600">{passwordError}</p>}

          <button
            className="mt-4 w-36 self-center border border-black text-black py-2 rounded hover:bg-black hover:text-white transition"
            onClick={handlePasswordChange}
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
