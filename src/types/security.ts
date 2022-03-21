export enum Role {
  RegionalManager = 6,
  CountryManager = 5,
  Advocate = 4,
  Trainer = 3,
  Sponsor = 2,
  Anonymous = 1,
}

export enum Permission {
  Employee_country_all,
  Employee_read,
  Employee_write,
  Document_read,
  Document_write,
  Group_read,
  Group_write,
  Group_country_all,
  Group_user_all,
  Email_write,
  Email_country_all,
  Dashboard_worldview_read,
  Dashboard_statistics_read,
  Dashboard_statistics_country_all,
}

export type PolicyMap = {
  [role in Role]: Permission[];
};
