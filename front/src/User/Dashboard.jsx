import { useState } from 'react';
import { Activity, Moon, Droplets, Pill, Clock, TrendingUp, Plus, Check, LayoutDashboard, User, MessageSquare, LogOut, Menu, X } from 'lucide-react';

export default function HealthDashboard() {
  const [steps, setSteps] = useState(5432);
  const [water, setWater] = useState(6);
  const [doses, setDoses] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });
  const [sleepStart, setSleepStart] = useState('22:30');
  const [sleepEnd, setSleepEnd] = useState('06:30');
  const [activities, setActivities] = useState([
    { time: '07:00', activity: 'Morning Walk', duration: 30 },
    { time: '18:00', activity: 'Gym', duration: 45 }
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stepsGoal = 10000;
  const waterGoal = 8;
  const stepsPercent = Math.min((steps / stepsGoal) * 100, 100);
  const waterPercent = Math.min((water / waterGoal) * 100, 100);

  const calculateSleepHours = () => {
    const [startH, startM] = sleepStart.split(':').map(Number);
    const [endH, endM] = sleepEnd.split(':').map(Number);
    let hours = endH - startH;
    let mins = endM - startM;
    if (hours < 0) hours += 24;
    if (mins < 0) {
      hours -= 1;
      mins += 60;
    }
    return `${hours}h ${mins}m`;
  };

  const addSteps = (amount) => {
    setSteps(prev => Math.min(prev + amount, 20000));
  };

  const addWater = () => {
    setWater(prev => Math.min(prev + 1, 15));
  };

  const toggleDose = (time) => {
    setDoses(prev => ({ ...prev, [time]: !prev[time] }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'activity', label: 'Activity Tracker', icon: Activity },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">HealthTrack</h2>
                  <p className="text-xs text-gray-500">Wellness App</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-gray-800">HealthTrack</h1>
          <div className="w-6"></div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4">
          {activeTab === 'dashboard' && (
            <>
              {/* Header */}
              <div className="max-w-6xl mx-auto mb-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Health Dashboard
                      </h1>
                      <p className="text-gray-600 mt-1">Track your daily wellness goals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Today</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Step Count Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Steps</h3>
                        <p className="text-xs text-gray-500">Daily Goal: {stepsGoal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-800">{steps.toLocaleString()}</span>
                      <span className="text-gray-500 mb-1">/ {stepsGoal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stepsPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{stepsPercent.toFixed(0)}% Complete</p>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => addSteps(1)}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded-lg transition"
                    >
                      +100
                    </button>
                    <button 
                      onClick={() => addSteps(500)}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded-lg transition"
                    >
                      +500
                    </button>
                    <button 
                      onClick={() => addSteps(1000)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      +1000
                    </button>
                  </div>
                </div>

                {/* Water Intake Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Water Intake</h3>
                        <p className="text-xs text-gray-500">Daily Goal: {waterGoal} glasses</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-800">{water}</span>
                      <span className="text-gray-500 mb-1">/ {waterGoal} glasses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${waterPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{waterPercent.toFixed(0)}% Complete</p>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded-lg transition ${
                          i < water ? 'bg-cyan-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>

                  <button 
                    onClick={addWater}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Glass
                  </button>
                </div>

                {/* Dose Intake Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Pill className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Medication</h3>
                      <p className="text-xs text-gray-500">Daily doses tracker</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'morning', label: 'Morning', time: '08:00 AM', color: 'orange' },
                      { key: 'afternoon', label: 'Afternoon', time: '02:00 PM', color: 'yellow' },
                      { key: 'evening', label: 'Evening', time: '08:00 PM', color: 'indigo' }
                    ].map(dose => (
                      <button
                        key={dose.key}
                        onClick={() => toggleDose(dose.key)}
                        className={`w-full p-4 rounded-xl border-2 transition ${
                          doses[dose.key]
                            ? 'bg-purple-50 border-purple-500'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                              doses[dose.key]
                                ? 'bg-purple-500 border-purple-500'
                                : 'border-gray-300'
                            }`}>
                              {doses[dose.key] && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-gray-800">{dose.label}</p>
                              <p className="text-xs text-gray-500">{dose.time}</p>
                            </div>
                          </div>
                          {doses[dose.key] && (
                            <span className="text-xs font-medium text-green-600">✓ Taken</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-center text-purple-700">
                      {Object.values(doses).filter(Boolean).length}/3 doses completed
                    </p>
                  </div>
                </div>

                {/* Sleep Schedule Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Moon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Sleep Schedule</h3>
                      <p className="text-xs text-gray-500">Track your rest time</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedtime
                      </label>
                      <input
                        type="time"
                        value={sleepStart}
                        onChange={(e) => setSleepStart(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wake Time
                      </label>
                      <input
                        type="time"
                        value={sleepEnd}
                        onChange={(e) => setSleepEnd(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Sleep</span>
                      <span className="text-2xl font-bold text-indigo-600">{calculateSleepHours()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Recommended: 7-9 hours
                    </p>
                  </div>
                </div>

                {/* Activity Timeline Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Activity Timeline</h3>
                      <p className="text-xs text-gray-500">Your scheduled activities</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-green-500 rounded-xl flex flex-col items-center justify-center text-white">
                            <span className="text-xs font-medium">{activity.time.split(':')[0]}</span>
                            <span className="text-lg font-bold">{activity.time.split(':')[1]}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{activity.activity}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            Duration: {activity.duration} minutes
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                            Scheduled
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 border-2 border-dashed border-gray-300 hover:border-green-500 text-gray-600 hover:text-green-600 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Activity
                  </button>
                </div>

              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
                <div className="text-center py-12">
                  <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Profile section coming soon...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Tracker</h2>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Activity tracker coming soon...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Messages coming soon...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}