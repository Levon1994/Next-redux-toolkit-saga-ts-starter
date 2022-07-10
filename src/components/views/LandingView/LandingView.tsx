import { FC } from 'react';

import { LandingLayout } from '@/components/layouts/LandingLayout';

import { ExampleSection } from './ExampleSection';
import { HomeSection } from './HomeSection';

export const LandingView: FC = () => {
  return (
    <LandingLayout>
      <HomeSection />

      <ExampleSection />
    </LandingLayout>
  );
};
