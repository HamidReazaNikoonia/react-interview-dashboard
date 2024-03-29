// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Sections',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'interview-list',
            title: 'Your Interviews Sessions',
            type: 'item',
            url: '/interview-list',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'create-interview',
            title: 'Create New Interview',
            type: 'item',
            url: '/create-interview',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
        // {
        //     id: 'authentication',
        //     title: 'Authentication',
        //     type: 'collapse',
        //     icon: icons.IconKey,

        //     children: [
        //         {
        //             id: 'login3',
        //             title: 'Logout',
        //             type: 'item',
        //             url: '/pages/login/logout',
        //             target: true
        //         }
        //     ]
        // }
    ]
};

export default pages;
