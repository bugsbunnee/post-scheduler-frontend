export enum Status {
    pending = 'pending',
    approved = 'approved',
    rejected = 'rejected',
    published = 'published'
}

export enum Platform {
    twitter = 'twitter',
    instagram = 'instagram',
    facebook = 'facebook'
}

export interface Post {
    _id: string;
    platform: Platform
    content: string;
    media: string;
    scheduleTime: Date | string;
    likes: number;
    shares: number;
    views: number;
    status: Status;
    approver?: string;
}

export interface MultiSelectOption { 
    label: string; 
    value: string; 
}