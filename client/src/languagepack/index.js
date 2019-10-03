import en from './en';
import th from './th';

export const branding = {
  href: '/tesco.com',
  logo: {
    height: {
      desktop: '35px',
      mobile: '26px',
    },
    width: {
      desktop: '121px',
      mobile: '88px',
    },
  },
  signpost: 'Trading Partner Service',
};

export const contentLinks = [
  {
    header: 'Our website',
    links: [
      {
        href: `/sign-in/#/terms-conditions`,
        text: 'Terms and conditions',
        rel: "noopener noreferrer"
      },
      {
        href: `/sign-in/#/privacy-policy`,
        text: 'Privacy and cookies policy',
        rel: "noopener noreferrer"
      }
    ],
  },
  {
    header: 'Useful links',
    links: [
      {
        href: `/toolkit/documents/view/`,
        text: 'Document library',
        rel: "noopener noreferrer"
      },
      {
        href: `/toolkit/newsReleases/view/`,
        text: 'News archive',
        rel: "noopener noreferrer"
      }
    ],
  },
  {
    header: 'Tesco sites',
    links: [
      {
        href: 'http://www.tescoplc.com',
        text: 'www.tescoplc.com',
        target: '_blank',
        rel: "noopener noreferrer"
      },
      {
        href: 'http://www.tesco.com/',
        text: 'www.tesco.com',
        target: '_blank',
        rel: "noopener noreferrer"
      }
    ],
  },
];
export const copyrightText = 'Tesco.com 2019 All Rights Reserved';

export const socialLinks = [
  {
    graphic: 'facebook',
    href: 'https://www.facebook.com/tesco/'
  },
  {
    graphic: 'twitter',
    href: 'https://twitter.com/tesco'
  },
  {
    graphic: 'pinterest',
    href: 'https://pinterest.com/tesco/'
  },
  {
    graphic: 'youtube',
    href: 'https://www.youtube.com/user/Tescomedia'
  },
  {
    graphic: 'instagram',
    href: 'https://www.instagram.com/tescofood/?hl=en'
  }
];

export const uamConstants = {
  routes: {
    ENABLE: 'enable',
  },
  navigation: {
    ENABLE: 'enable',
  },
};

export const UAMConfig = {
  managesupplier: {
    href: '/tradingpartner',
    popUpStatus: false,
    text: 'Manage suppliers',
  },
  createsupplier: {
    href: '/tradingpartner/create',
    popUpStatus: false,
    text: 'Create new supplier',
  },
};

export const secondaryNavigation = {
  mobileMenuItem: {
    href: '#',
    text: 'Menu',
  },
  moreMenuItem: {
    href: '#',
    text: 'More',
  },
  visibleMenuItems: {
    belowTabletLarge: 2,
    belowDesktop: 2,
  },
};


export default {
  en,
  th,
  MANAGESUPPLIER: 'Manage a Supplier',
  CREATESUPPLIER: 'Create a new partner',
  SUPPLIER: 'Supplier',
  SITE: 'Site',
  PAYMENT_TERMS: 'Payment Terms',
  CREATE_NEW_SUPPLIER_TEXT: 'Create a new supplier',
  CREATE_NEW_SUPPLIER_SUBTEXT:
    'We will tell you if there are any matching records',
  CONFIRM_BTN: 'Confirm Supplier Details',
  SUCCESS_INFO: 'Partner record successfully saved',
  VALIDATION_ERROR:
    'Form has errors. Please check the highlighted fields and fill the information properly',
  authCookie: 'OAuth.AccessToken.EP',
  heading: 'Find a Partner',
  subHeading: 'Enter one or more terms',
  supplierNameText: 'Search for partner name',
  supplierNumberText: 'Search for partner reference number (8 digits)',
  supplierNamePlaceHolder: 'Enter partner name..',
  supplierNumberPlaceHolder: 'Enter partner number..',
  searchButton: 'Find supplier',
  inputValid: 'Please enter atleast one field',
  supplierNameError: 'Please enter a Partner name',
  supplierNumberError: 'Please enter a Partner number',
  supplierNotFound: 'No partner found',
  invalidSupplierName: 'Please enter valid Partner name',
  invalidSupplierNumber: 'Please enter valid Supplier number',
  addNew: 'addNew',
  searchListHeading: 'Matches found for supplier',
  select: 'Select',
  createNew: 'Create New',
  create: 'Create',
  editDetails: 'Edit details',
  supplierName: 'Supplier name',
  companiesHouseName: 'Companies House name',
  tradingPartnerNumber: 'Trading Partner Number',
  companyRegistrationNumber: 'Company registration number',
  vatNumber: 'VAT number',
  tableHead: 'Multiple matches found. Select an existing site to view its details, or create a new site for this supplier.',
  associatedWithSupplier: 'Associated with supplier',
  CONTACT_ADMIN_FOR_ACCESS: 'Sorry, does not have sufficent access, Please contact admin.',
  SITE_TABLE_HEAD: [null, 'Site Name', 'Site Id'],
  SITE_BODY_VALUES: ['siteName', 'siteCodeId'],
  PAYMENT_BODY_VALUES: ['paymentTermsName'],
  PAYMENT_TABLE_HEAD: [null, 'TNC number'],
  SELECT: 'Select',
  ADD_NEW: 'Add new',
  supplierDetails: 'partner details',
  stepTwoSubTitle: 'Create a new partner by entering the details below',
  siteDetails: 'Site details',
  paymentDetails: 'Payment terms',
  globalErrorMessage: {
    403: {
      title: `We're sorry, unauthorized access.`,
      body: 'Unfortunately a 403 error occured',
    },
    404: {
      title: 'We’re sorry we couldn’t find the page you were looking for.',
      body: 'Unfortunately a 404 error occured. Please use the button below to return to the homepage.',
    },
  },
  attributeGroupType: 'Case',
  partnerName: 'Companies House name',
  partnerNumber: 'Trading Partner Number',
  id: 'Id',
  view: 'View',
  cancelFormText: 'Are you sure you want to cancel? You will lose any unsaved data.',
  save: 'Save',
  cancel: 'Cancel',
  yesCancel: 'Yes, cancel',
  no: 'No',
  whatsThis: 'What’s this?',
  address: 'Address',
  addresses: ' addresses',
  status: 'Status',
  noAddressFound: 'There are currently no addresses available',
  contacts: 'Contacts',
  contactName: 'Contact name',
  currentContact: 'Current contact name',
  active: 'Active',
  inActive: 'Inactive',
  addNewAddress: 'Add new address',
  addNewContact: 'Add new contact',
  noContactFound: 'There are currently no contacts available',
  role: 'Role',
  location: 'location',
  formSubmitErrorTitle: 'We were unable to submit the form',
  fetchContactsErrorTtile: 'We were unable to fetch the contacts',
  submitAgain: 'Looks like something went wrong. Please try submitting again'
};
