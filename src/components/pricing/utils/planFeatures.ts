import { FeatureDetail } from '../types';

export const getFeatureDetails = (plan: string, t: (key: string) => string): FeatureDetail[] => {
  const features: FeatureDetail[] = [];
  
  if (plan === 'basic') {
    features.push(
      {
        name: t('pricing.detailedFeatures.basic.salesManagement.name'),
        description: t('pricing.detailedFeatures.basic.salesManagement.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.personalPage.name'),
        description: t('pricing.detailedFeatures.basic.personalPage.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.clientManagement.name'),
        description: t('pricing.detailedFeatures.basic.clientManagement.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.messaging.name'),
        description: t('pricing.detailedFeatures.basic.messaging.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.calendar.name'),
        description: t('pricing.detailedFeatures.basic.calendar.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.reviews.name'),
        description: t('pricing.detailedFeatures.basic.reviews.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.analytics.name'),
        description: t('pricing.detailedFeatures.basic.analytics.description')
      },
      {
        name: t('pricing.detailedFeatures.basic.googleCalendar.name'),
        description: t('pricing.detailedFeatures.basic.googleCalendar.description')
      }
    );
  } else if (plan === 'essential') {
    // Add "Everything in Basic" first
    features.push({
      name: t('pricing.detailedFeatures.everythingInBasic.name'),
      description: t('pricing.detailedFeatures.everythingInBasic.description'),
      isInheritedFeature: true
    });
    
    // Add Essential-specific features
    features.push(
      {
        name: t('pricing.detailedFeatures.essential.sessions.name'),
        description: t('pricing.detailedFeatures.essential.sessions.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.waitlist.name'),
        description: t('pricing.detailedFeatures.essential.waitlist.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.programs.name'),
        description: t('pricing.detailedFeatures.essential.programs.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.sessionAnalytics.name'),
        description: t('pricing.detailedFeatures.essential.sessionAnalytics.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.programsAnalytics.name'),
        description: t('pricing.detailedFeatures.essential.programsAnalytics.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.exerciseList.name'),
        description: t('pricing.detailedFeatures.essential.exerciseList.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.exerciseManagement.name'),
        description: t('pricing.detailedFeatures.essential.exerciseManagement.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.cashPayments.name'),
        description: t('pricing.detailedFeatures.essential.cashPayments.description')
      },
      {
        name: t('pricing.detailedFeatures.essential.paymentInstallments.name'),
        description: t('pricing.detailedFeatures.essential.paymentInstallments.description')
      }
    );
  } else if (plan === 'pro') {
    // Add "Everything in Essential" first
    features.push({
      name: t('pricing.detailedFeatures.everythingInEssential.name'),
      description: t('pricing.detailedFeatures.everythingInEssential.description'),
      isInheritedFeature: true
    });
    
    // Add Pro-specific features
    features.push(
      {
        name: t('pricing.detailedFeatures.pro.packages.name'),
        description: t('pricing.detailedFeatures.pro.packages.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.services.name'),
        description: t('pricing.detailedFeatures.pro.services.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.payments.name'),
        description: t('pricing.detailedFeatures.pro.payments.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.installments.name'),
        description: t('pricing.detailedFeatures.pro.installments.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.invoicing.name'),
        description: t('pricing.detailedFeatures.pro.invoicing.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.transactions.name'),
        description: t('pricing.detailedFeatures.pro.transactions.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.businessDashboard.name'),
        description: t('pricing.detailedFeatures.pro.businessDashboard.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.advancedAnalytics.name'),
        description: t('pricing.detailedFeatures.pro.advancedAnalytics.description')
      },
      {
        name: t('pricing.detailedFeatures.pro.prioritySupport.name'),
        description: t('pricing.detailedFeatures.pro.prioritySupport.description')
      }
    );
  }
  
  return features;
};