import step01Before from '../../../comparisons/step-01-landing-pages-before.jpg';
import step01After from '../../../comparisons/step-01-landing-pages-after.jpg';
import step02Before from '../../../comparisons/step-02-class-search-link-before.jpg';
import step02After from '../../../comparisons/step-02-class-search-link-after.jpg';
import step03Before from '../../../comparisons/step-03-signin-to-continue-before.jpg';
import step03After from '../../../comparisons/step-03-signin-to-continue-after.jpg';
import step04Before from '../../../comparisons/step-04-unified-application-before.jpg';
import step04After from '../../../comparisons/step-04-unified-application-after.jpg';
import step05Before from '../../../comparisons/step-05-next-steps-comms-before.jpg';
import step05After from '../../../comparisons/step-05-next-steps-comms-after.jpg';
import step06Before from '../../../comparisons/step-06-applies-for-class-before.jpg';
import step06After from '../../../comparisons/step-06-applies-for-class-after.jpg';
import step07Before from '../../../comparisons/step-07-submits-app-before.jpg';
import step07After from '../../../comparisons/step-07-submits-app-after.jpg';
import step08Before from '../../../comparisons/step-08-next-steps-comms-before.jpg';
import step08After from '../../../comparisons/step-08-next-steps-comms-after.jpg';
import step09Before from '../../../comparisons/step-09-track-application-status-before.jpg';
import step09After from '../../../comparisons/step-09-track-application-status-after.jpg';
import step10Before from '../../../comparisons/step-10-admission-dec-comms-before.jpg';
import step10After from '../../../comparisons/step-10-admission-dec-comms-after.jpg';
import step11Before from '../../../comparisons/step-11-seamless-registration-before.jpg';
import step11After from '../../../comparisons/step-11-seamless-registration-after.jpg';
import step12Before from '../../../comparisons/step-12-payment-reminder-comms-before.jpg';
import step12After from '../../../comparisons/step-12-payment-reminder-comms-after.jpg';
import step13Before from '../../../comparisons/step-13-tuition-payment-before.jpg';
import step13After from '../../../comparisons/step-13-tuition-payment-after.jpg';

// Keyed by future state marker index (0-based).
// Step number = marker index + 1
export const comparisonImages: Record<number, { before: string; after: string }> = {
  0:  { before: step01Before, after: step01After },  // Consistent policies on landing pages
  1:  { before: step02Before, after: step02After },  // Finds a class to enroll in
  2:  { before: step03Before, after: step03After },  // Signs in to apply
  3:  { before: step04Before, after: step04After },  // Starts application
  4:  { before: step05Before, after: step05After },  // App started email
  5:  { before: step06Before, after: step06After },  // Confirms class
  6:  { before: step07Before, after: step07After },  // Submits app and pays fee
  7:  { before: step08Before, after: step08After },  // App submitted email
  8:  { before: step09Before, after: step09After },  // Tracks application status
  9:  { before: step10Before, after: step10After },  // Admission decision email
  10: { before: step11Before, after: step11After },  // Completes enrollment in class
  11: { before: step12Before, after: step12After },  // Payment reminder email
  12: { before: step13Before, after: step13After },  // Pays tuition
};
