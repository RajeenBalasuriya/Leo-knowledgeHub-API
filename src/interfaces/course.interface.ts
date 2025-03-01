export interface IInstructor {
    name: string;
    bio?: string;
    profilePicture?: string;
  }
  
  export interface ILesson {
    title: string;
    videoUrl?: string;
    content?: string;
  }
  
  export interface ISection {
    title: string;
    lessons: ILesson[];
  }
  
  export interface ICourse {
    id?:string;
    title: string;
    description: string;
    category?: string;
    instructor: IInstructor;
    rating?: number;
    sections: ISection[];
    enrolledStudent: string[];
  }
  