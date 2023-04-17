import { IconDotsVertical, IconEdit } from '@tabler/icons-solidjs';
import { Component, For, createSignal } from 'solid-js';
import IconButton from '../../components/IconButton';

interface Announcement {
  firstName: string;
  lastName: string;
  callsign: number;
  image: string;
  content: string;
  createdAt: Date;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    firstName: 'John',
    lastName: 'Smith',
    callsign: 132,
    image: '',
    content: 'This is a very important announcement lmao',
    createdAt: new Date(),
  },
  {
    firstName: 'Peter',
    lastName: 'Pan',
    callsign: 233,
    image: '',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente aperiam neque ratione consectetur in ullam voluptatum, quod eos velit fugiat iste aspernatur dolores vero nihil nam earum magnam incidunt illo dolore. Repellendus quaerat minus obcaecati harum repellat est, iusto consectetur deleniti nesciunt vel officia dolores placeat commodi neque dignissimos fugiat.',
    createdAt: new Date(),
  },
  {
    firstName: 'Peter',
    lastName: 'Pan',
    callsign: 233,
    image: '',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente aperiam neque ratione consectetur in ullam voluptatum, quod eos velit fugiat iste aspernatur dolores vero nihil nam earum magnam incidunt illo dolore. Repellendus quaerat minus obcaecati harum repellat est, iusto consectetur deleniti nesciunt vel officia dolores placeat commodi neque dignissimos fugiat.',
    createdAt: new Date(),
  },
  {
    firstName: 'Peter',
    lastName: 'Pan',
    callsign: 233,
    image: '',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente aperiam neque ratione consectetur in ullam voluptatum, quod eos velit fugiat iste aspernatur dolores vero nihil nam earum magnam incidunt illo dolore. Repellendus quaerat minus obcaecati harum repellat est, iusto consectetur deleniti nesciunt vel officia dolores placeat commodi neque dignissimos fugiat.',
    createdAt: new Date(),
  },
  {
    firstName: 'Peter',
    lastName: 'Pan',
    callsign: 233,
    image: '',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente aperiam neque ratione consectetur in ullam voluptatum, quod eos velit fugiat iste aspernatur dolores vero nihil nam earum magnam incidunt illo dolore. Repellendus quaerat minus obcaecati harum repellat est, iusto consectetur deleniti nesciunt vel officia dolores placeat commodi neque dignissimos fugiat.',
    createdAt: new Date(),
  },
];

const AnnouncementList: Component = () => {
  const [announcements, setAnnouncements] = createSignal<Announcement[]>(ANNOUNCEMENTS);

  return (
    <div class="flex flex-col gap-2 overflow-y-auto px-4">
      <For each={announcements()}>
        {(announcement) => (
          <div class="flex flex-col gap-3 rounded-md bg-durple-200 p-3 font-bold text-dark-50 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p>{`${announcement.firstName} ${announcement.lastName} · ${announcement.callsign}`}</p>
                <p class="text-xs">{announcement.createdAt.toLocaleDateString()}</p>
              </div>
              <IconButton icon={IconEdit} />
            </div>
            <div class="text-sm font-normal text-dark-100">{announcement.content}</div>
          </div>
        )}
      </For>
    </div>
  );
};

export default AnnouncementList;
