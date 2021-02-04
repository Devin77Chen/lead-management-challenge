import { Meteor } from 'meteor/meteor';
import { 
    insertCategoriesData, 
    insertJobEventsData, 
    insertSuburbsData,
    buildJobEvents 
} from './utils/demoHelpers';
import { Categories } from './collections/categories';
import { JobEvents } from './collections/jobevents';
import { Suburbs } from './collections/suburbs';
import CategoriesData from './dataset/categories';
import JobsData from './dataset/jobs';
import SuburbsData from './dataset/suburbs';
// import './methods/db_operations';
// import './methods/users';
import './publications/categories';
import './publications/jobevents';
import './publications/suburbs';

// Test data are created and dumpped into memory when the server gets started
Meteor.startup(() => {
  insertCategoriesData(Categories, CategoriesData, console.log, console.error);
  insertSuburbsData(Suburbs, SuburbsData, console.log, console.error);
  const jobEventsData = buildJobEvents(JobsData);
  insertJobEventsData(JobEvents, jobEventsData, console.log, console.error);
});