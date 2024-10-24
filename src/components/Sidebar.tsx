import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarProps {
  children: ReactNode;
}

interface SidebarMenuItemProps {
  icon: ReactNode;
  text: string;
  isActive?: boolean;
  hasAlert?: boolean;
}

const SidebarContext = createContext({ isSidebarExpanded: true }); //context to extended sidebar

export default function Sidebar({ children }: SidebarProps) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const toggleSidebar = () => setSidebarExpanded((prevState) => !prevState);

  return (
    <aside className='h-screen'>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <LogoSection
          isSidebarExpanded={isSidebarExpanded}
          onToggle={toggleSidebar}
        />
        <SidebarContext.Provider value={{ isSidebarExpanded }}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SidebarContext.Provider>
        <ProfileSection isSidebarExpanded={isSidebarExpanded} />
      </nav>
    </aside>
  );
}

function ProfileSection({ isSidebarExpanded }: { isSidebarExpanded: boolean }) {
  return (
    <div className='border-t flex p-3'>
      <img
        src='profile.png'
        className='w-10 h-10 rounded-md'
      />
      <div
        className={`
                flex justify-between items-center
                overflow-hidden transition-all ${
                  isSidebarExpanded ? 'w-52 ml-3' : 'w-0'
                }
            `}
      >
        <div className='leading-4'>
          <h4 className='font-semibold'>Jhon Doe</h4>
          <span className='text-xs text-gray-600'>jhondoe@gmail.com</span>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  );
}

function LogoSection({
  isSidebarExpanded,
  onToggle,
}: {
  isSidebarExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className='p-4 pb-2 flex justify-between items-center'>
      <img
        src='vite.svg'
        className={`overflow-hidden transition-all ${
          isSidebarExpanded ? 'w-13' : 'w-0'
        }`}
        alt=''
      ></img>
      <button
        onClick={onToggle}
        className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'
      >
        {isSidebarExpanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
  );
}

export function SidebarItem({
  icon,
  text,
  isActive,
  hasAlert,
}: SidebarMenuItemProps) {
  const { isSidebarExpanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group

        ${
          isActive
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
      `}
    >
      {icon}
      <span
        className={`
            overflow-hidden transition-all ${
              isSidebarExpanded ? 'w-52 ml-3' : 'w-0'
            }
            `}
      >
        {text}
      </span>

      {hasAlert && <AlertIndicator isSidebarExpanded={isSidebarExpanded} />}

      {!isSidebarExpanded && <Tooltip text={text} />}
    </li>
  );
}

function AlertIndicator({ isSidebarExpanded }: { isSidebarExpanded: boolean }) {
  return (
    <div
      className={`absolute right-2 w-2 h-2 rounded bg-indigo-400
      ${isSidebarExpanded ? '' : 'top-2'}`}
    />
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <div
      className={`
       absolute left-full rounded-md px-2 py-1 ml-6
      bg-indigo-100 text-indigo-800 text-sm
      invisible opacity-20 -translate-x-3 transition-all
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
  `}
    >
      {text}
    </div>
  );
}
