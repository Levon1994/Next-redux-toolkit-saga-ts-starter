import { PagesTitlesEnum } from '@/configs/pages';

import { LandingView } from '@/components/views/LandingView';

import { NextPageEnhanced } from '@/types/app';

export const LandingPage: NextPageEnhanced = () => {
  return <LandingView />;
};

LandingPage.title = PagesTitlesEnum.HOME;

export default LandingPage;
