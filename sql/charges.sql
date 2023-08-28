-- Offenses mostly taken from https://github.com/FlawwsX/erp_mdt/blob/main/sv_main.lua#L1723-L1938 and altered

-- OFFENSES AGAINST PERSONS
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Simple Assault', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, without his or her consent, and without causing significant injury.', 7, 500),
    ('Assault', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, without his or her consent, that causes significant injury.', 15, 850),
    ('Aggravated Assault', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, with the intent to cause serious bodily injury or death.', 20, 1250),
    ('Assault with a Deadly Weapon', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, with the use of a deadly weapon.', 30, 3750),
    ('Involuntary Manslaughter', 'felony', 'OFFENSES AGAINST PERSONS', 'Involuntary manslaughter is a criminal charge that is brought against someone who unintentionally causes the death of another person. It is a less serious crime than murder, but it can still result in significant penalties, including jail time.', 60, 7500),
    ('Vehicular Manslaughter', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of a human being by the act of another, but without malice aforethought.', 75, 7500),
    ('Attempted Murder of a Civilian', 'felony', 'OFFENSES AGAINST PERSONS', 'An intentional, but unsuccessful, act to kill another person.', 50, 7500),
    ('Second Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of another human being with malice aforethought, but not premeditated.', 100, 15000),
    ('Accessory to Second Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after a murder has been committed, assists the murderer in avoiding or escaping punishment.', 50, 5000),
    ('First Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of another human being with malice aforethought, and with premeditation.', 150, 20000),
    ('Accessory to First Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, before or during the commission of a murder, aids or abets the murderer in the planning or commission of the crime.', 75, 10000),
    ('Murder of a Public Servant or Peace Officer', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of a public servant or peace officer, while such person is engaged in the performance of his or her official duties.', 150, 20000),
    ('Attempted Murder of a Public Servant or Peace Officer', 'felony', 'OFFENSES AGAINST PERSONS', 'An intentional, but unsuccessful, act to kill a public servant or peace officer, while such person is engaged in the performance of his or her official duties.', 65, 10000),
    ('Accessory to the Murder of a Public Servant or Peace Officer', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after the murder of a public servant or peace officer, assists the murderer in avoiding or escaping punishment.', 75, 10000),
    ('Unlawful Imprisonment', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The unlawful detention or confinement of another person without his or her consent.', 10, 600),
    ('Kidnapping', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful taking and carrying away of another person by force or fraud, with the intent to secretly confine or imprison him or her.', 15, 900),
    ('Accessory to Kidnapping', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after a kidnapping has been committed, assists the kidnapper in avoiding or escaping punishment.', 7, 450),
    ('Attempted Kidnapping', 'felony', 'OFFENSES AGAINST PERSONS', 'An intentional, but unsuccessful, act to kidnap another person.', 10, 450),
    ('Hostage Taking', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful seizure or detention of a person as a hostage, with the intent to force a third party to do or refrain from doing something.', 20, 1200),
    ('Accessory to Hostage Taking', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after a hostage taking has been committed, assists the hostage taker in avoiding or escaping punishment.', 10, 600),
    ('Unlawful Imprisonment of a Public Servant or Peace Officer.', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful detention or confinement of a public servant or peace officer without his consent', 25, 4000),
    ('Criminal Threats', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The intentional or reckless communication of a threat to cause death or serious bodily harm to another person.', 5, 500),
    ('Reckless Endangerment', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The creation of a substantial risk of death or serious bodily harm to another person by the commission of a reckless act.', 10, 1000),
    ('Gang Related Shooting', 'felony', 'OFFENSES AGAINST PERSONS', 'The discharge of a firearm in a public place, or at another person, with the intent to cause death or serious bodily harm, and the act is committed in association with a criminal street gang.', 30, 2500),
    ('Cannibalism', 'felony', 'OFFENSES AGAINST PERSONS', 'The intentional killing and consumption of the flesh of another human being.', 180, 30000),
    ('Torture', 'felony', 'OFFENSES AGAINST PERSONS', 'The intentional infliction of severe pain or suffering on another person, for the purpose of obtaining information or a confession, or for the purpose of punishment, revenge, or sadism.', 40, 4500);

-- OFFENSES INVOLVING THEFT
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Petty Theft', 'infraction', 'OFFENSES INVOLVING THEFT', 'Theft of property valued less than $950', 0, 250),
    ('Grand Theft', 'misdemeanor', 'OFFENSES INVOLVING THEFT', 'Theft of property valued at least $950 but less than $2500', 10, 600),
    ('Grand Theft Auto A', 'felony', 'OFFENSES INVOLVING THEFT', 'Theft of a motor vehicle valued at least $2500 but less than $5000', 15, 900),
    ('Grand Theft Auto B', 'felony', 'OFFENSES INVOLVING THEFT', 'Theft of a motor vehicle valued at least $5000', 35, 3500),
    ('Carjacking', 'felony', 'OFFENSES INVOLVING THEFT', 'Theft of a motor vehicle by force or violence', 30, 2000),
    ('Burglary', 'misdemeanor', 'OFFENSES INVOLVING THEFT', 'Theft of property from a building', 10, 500),
    ('Robbery', 'felony', 'OFFENSES INVOLVING THEFT', 'Theft of property from a person by force or threat of force', 25, 2000),
    ('Accessory to Robbery', 'felony', 'OFFENSES INVOLVING THEFT', 'Person who is present at the scene of a robbery and aids or abets the robbery', 12, 1000),
    ('Attempted Robbery', 'felony', 'OFFENSES INVOLVING THEFT', 'Attempted robbery', 20, 1000),
    ('Armed Robbery', 'felony', 'OFFENSES INVOLVING THEFT', 'Robbery with a dangerous weapon', 30, 3000),
    ('Accessory to Armed Robbery', 'felony', 'OFFENSES INVOLVING THEFT', 'Person who is present at the scene of an armed robbery and aids or abets the robbery', 15, 1500),
    ('Attempted Armed Robbery', 'felony', 'OFFENSES INVOLVING THEFT', 'Attempted robbery with a dangerous weapon', 25, 1500),
    ('Grand Larceny', 'felony', 'OFFENSES INVOLVING THEFT', 'Theft of property valued at least $7500', 45, 7500),
    ('Leaving Without Paying', 'infraction', 'OFFENSES INVOLVING THEFT', 'Leaving a restaurant or retail establishment without paying for food or merchandise', 0, 500),
    ('Possession of Nonlegal Currency', 'misdemeanor', 'OFFENSES INVOLVING THEFT', 'Possession of counterfeit currency', 10, 750),
    ('Possession of Government-Issued Items', 'misdemeanor', 'OFFENSES INVOLVING THEFT', 'Possession of government-issued identification cards or other items without authorization', 15, 1000),
    ('Possession of Items Used in the Commission of a Crime', 'misdemeanor', 'OFFENSES INVOLVING THEFT', 'Possession of tools or other items used in the commission of a crime', 10, 500),
    ('Sale of Items Used in the Commission of a Crime', 'felony', 'OFFENSES INVOLVING THEFT', 'Sale of tools or other items used in the commission of a crime', 15, 1000),
    ('Theft of an Aircraft', 'felony', 'OFFENSES INVOLVING THEFT', 'Theft of an aircraft', 20, 1000);

-- OFFENSES INVOLVING FRAUD
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Impersonating', 'misdemeanor', 'OFFENSES INVOLVING FRAUD', 'Falsely representing oneself as another person in order to gain something, such as money or property.', 15, 1250),
    ('Impersonating a Peace Officer or Public Servant', 'felony', 'OFFENSES INVOLVING FRAUD', 'Deliberately pretending to be a law enforcement officer or other government official in order to deceive or intimidate others.', 25, 2750),
    ('Impersonating a Judge', 'felony', 'OFFENSES INVOLVING FRAUD', 'Falsely claiming to be a judge in order to influence the outcome of a legal proceeding.', 120, 15000),
    ('Possession of Stolen Identification', 'misdemeanor', 'OFFENSES INVOLVING FRAUD', 'Having in one\'s possession identification that was stolen from another person.', 10, 750),
    ('Possession of Stolen Government Identification', 'misdemeanor', 'OFFENSES INVOLVING FRAUD', 'Having in one\'s possession government identification that was stolen from another person, such as a driver\'s license or passport.', 20, 2000),
    ('Extortion', 'felony', 'OFFENSES INVOLVING FRAUD', 'Obtaining something, such as money or property, from another person through the use of coercion or threats.', 20, 900),
    ('Fraud', 'misdemeanor', 'OFFENSES INVOLVING FRAUD', 'Intentionally deceiving another person in order to gain something, such as money or property.', 10, 450),
    ('Forgery', 'misdemeanor', 'OFFENSES INVOLVING FRAUD', 'Making or altering a document with the intent to deceive another person.', 15, 750),
    ('Money Laundering', 'felony', 'OFFENSES INVOLVING FRAUD', 'Concealing or disguising the origins of illegally obtained money in order to make it appear to have been obtained legally.', 80, 7500);

-- OFFENSES INVOLVING DAMAGE TO PROPERTY
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Trespassing', 'misdemeanor', 'OFFENSES INVOLVING DAMAGE TO PROPERTY', 'Entering or remaining on someone else\'s property without permission.', 10, 450),
    ('Felony Trespassing', 'felony', 'OFFENSES INVOLVING DAMAGE TO PROPERTY', 'Entering or remaining on someone else\'s property without permission, when the property is a school, government building, or other protected location.', 15, 1500),
    ('Arson', 'felony', 'OFFENSES INVOLVING DAMAGE TO PROPERTY', 'Intentionally setting fire to property, with the intent to destroy or damage it.', 15, 1500),
    ('Vandalism', 'infraction', 'OFFENSES INVOLVING DAMAGE TO PROPERTY', 'Willfully damaging or destroying someone else\'s property.', 0, 300),
    ('Vandalism of Government Property', 'felony', 'OFFENSES INVOLVING DAMAGE TO PROPERTY', 'Willfully damaging or destroying government property.', 20, 1500),
    ('Littering', 'infraction', 'OFFENSES INVOLVING DAMAGE TO PROPERTY', 'Disposing of trash or other unwanted materials in a public place.', 0, 200);

-- OFFENSES AGAINST PUBLIC ADMINISTRATION
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Bribery of a Government Official', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Offering or giving something of value to a government official in exchange for official action.', 20, 3500),
    ('Anti-Mask Law', 'infraction', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Failing to wear a mask in a public place, as required by law.', 0, 750),
    ('Possession of Contraband in a Government Facility', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Bringing prohibited items into a government facility, such as a prison or courthouse.', 25, 1000),
    ('Criminal Possession of Stolen Property', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Knowingly possessing property that has been stolen.', 10, 500),
    ('Escaping', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Unauthorized departure from a prison or other secure facility.', 10, 450),
    ('Jailbreak', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'The unlawful release of a prisoner from custody.', 30, 2500),
    ('Accessory to Jailbreak', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Assisting in the escape of a prisoner from custody.', 25, 2000),
    ('Attempted Jailbreak', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'The unsuccessful attempt to escape from a prison or other secure facility.', 20, 1500),
    ('Perjury', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Giving false testimony under oath in a legal proceeding.', 100, 20000),
    ('Violation of a Restraining Order', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Willfully violating the terms of a restraining order.', 20, 2250),
    ('Embezzlement', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'The theft of money or property by someone who has been entrusted with it.', 45, 10000),
    ('Unlawful Practice', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Engaging in a profession or occupation without the proper license or authorization.', 15, 1500),
    ('Misuse of Emergency Systems', 'infraction', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Intentionally making a false or misleading report to an emergency service.', 0, 600),
    ('Conspiracy', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'The agreement between two or more people to commit a crime.', 10, 450),
    ('Violating a Court Order', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Willfully disobeying a court order.', 30, 13000),
    ('Failure to Appear', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Failing to appear in court as required.', 20, 8000),
    ('Contempt of Court', 'felony', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Willfully disobeying a court order or disrupting a court proceeding.', 40, 3000),
    ('Resisting Arrest', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ADMINISTRATION', 'Willfully obstructing or interfering with an arrest.', 5, 300);

-- OFFENSES AGASINT PUBLIC ORDER
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Disobeying a Peace Officer', 'infraction', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully disobeying a peace officer\'s order, even if the order is unreasonable or unlawful.', 0, 750),
    ('Disorderly Conduct', 'infraction', 'OFFENSES AGAINST PUBLIC ORDER', 'Publicly behaving in a disorderly or disruptive manner, such that it is likely to disturb the peace or endanger the safety of others.', 0, 250),
    ('Disturbing the Peace', 'infraction', 'OFFENSES AGAINST PUBLIC ORDER', 'Creating a disturbance that unreasonably interferes with the peace or quiet of others.', 0, 350),
    ('False Reporting', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully making a false or misleading report to a peace officer or other public official.', 10, 750),
    ('Harassment', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Engaging in a course of conduct that is intended to annoy, alarm, or frighten another person.', 10, 500),
    ('Misdemeanor Obstruction of Justice', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully obstructing or interfering with an investigation or legal proceeding.', 10, 500),
    ('Felony Obstruction of Justice', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully obstructing or interfering with an investigation or legal proceeding, resulting in serious injury or damage.', 15, 900),
    ('Inciting a Riot', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Soliciting or inciting others to engage in a riot.', 25, 1000),
    ('Loitering on Government Properties', 'infraction', 'OFFENSES AGAINST PUBLIC ORDER', 'Loitering on government property without a legitimate purpose.', 0, 500),
    ('Tampering', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully tampering with or destroying property.', 10, 500),
    ('Vehicle Tampering', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully tampering with or destroying a vehicle.', 15, 750),
    ('Evidence Tampering', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully tampering with or destroying evidence in a legal proceeding.', 20, 1000),
    ('Witness Tampering', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully tampering with or threatening a witness in a legal proceeding.', 25, 9000),
    ('Failure to Provide Identification', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Willfully refusing to provide identification to a peace officer.', 15, 1500),
    ('Vigilantism', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Taking the law into one\'s own hands and apprehending or punishing a suspected criminal.', 30, 1500),
    ('Government Corruption', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Using one\'s position in government to enrich oneself or others.', 60, 17500),
    ('Stalking', 'felony', 'OFFENSES AGAINST PUBLIC ORDER', 'Repeatedly following or harassing another person.', 40, 1500),
    ('Aiding and Abetting', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Assisting or encouraging another person to commit a crime.', 15, 450),
    ('Harboring a Fugitive', 'misdemeanor', 'OFFENSES AGAINST PUBLIC ORDER', 'Knowingly helping a fugitive to avoid arrest or prosecution.', 10, 1000);

-- OFFENSES AGAINST HEALTH AND MORALS
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Misdemeanor Possession of Marijuana', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of less than 28.5 grams of marijuana.', 0, 250),
    ('Felony Possession of Marijuana', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of more than 28.5 grams of marijuana.', 0, 1000),
    ('Cultivation of Marijuana A', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Cultivation of less than 6 plants of marijuana.', 0, 750),
    ('Cultivation of Marijuana B', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Cultivation of more than 6 plants of marijuana.', 0, 1500),
    ('Possession of Marijuana with Intent to Distribute', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of marijuana with the intent to sell or distribute.', 0, 3000),
    ('Misdemeanor Possession of Cocaine', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of less than 2.5 grams of cocaine.', 0, 500),
    ('Felony Possession of Cocaine', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of more than 2.5 grams of cocaine.', 0, 1500),
    ('Possession of Cocaine with Intent to Distribute', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of cocaine with the intent to sell or distribute.', 0, 4500),
    ('Misdemeanor Possession of Methamphetamine', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of less than 2 grams of methamphetamine.', 0, 500),
    ('Felony Possession of Methamphetamine', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of more than 2 grams of methamphetamine.', 0, 1500),
    ('Possession of Methamphetamine with Intent to Distribute', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of methamphetamine with the intent to sell or distribute.', 0, 4500),
    ('Misdemeanor Possession of Oxy / Vicodin', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of less than 4 grams of oxycodone or hydrocodone.', 0, 500),
    ('Felony Possession of Oxy / Vicodin', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of more than 4 grams of oxycodone or hydrocodone.', 0, 1500),
    ('Felony Possession of Oxy / Vicodin with Intent to Distribute', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of oxycodone or hydrocodone with the intent to sell or distribute.', 0, 4500),
    ('Misdemeanor Possession of Shrooms', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of less than 2 grams of psilocybin mushrooms.', 0, 500),
    ('Felony Possession of Shrooms', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of more than 2 grams of psilocybin mushrooms.', 0, 1500),
    ('Possession of Shrooms with Intent to Distribute', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of psilocybin mushrooms with the intent to sell or distribute.', 0, 4500),
    ('Misdemeanor Possession of Lean', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of less than 4 ounces of codeine cough syrup.', 0, 500),
    ('Felony Possession of Lean', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of more than 4 ounces of codeine cough syrup.', 0, 1500),
    ('Possession of Lean with Intent to Distribute', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'Possession of codeine cough syrup with the intent to sell or distribute.', 0, 4500),
    ('Sale of a controlled substance', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Sale of a controlled substance without a license.', 0, 1000),
    ('Drug Trafficking', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'The transportation of a controlled substance across state lines.', 45, 15000),
    ('Desecration of a Human Corpse', 'felony', 'OFFENSES AGAINST HEALTH AND MORALS', 'The desecration of a human corpse, such as mutilation or defilement.', 0, 1500),
    ('Public Intoxication', 'infraction', 'OFFENSES AGAINST HEALTH AND MORALS', 'Being intoxicated in public in a way that is disruptive or dangerous.', 0, 500),
    ('Public Indecency', 'misdemeanor', 'OFFENSES AGAINST HEALTH AND MORALS', 'Engaging in indecent or lewd behavior in public.', 0, 750);

-- OFFENSES AGAINST PUBLIC SAFETY
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Criminal Possession of Weapon Class A', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Possession of a Class A weapon, such as a machine gun, assault rifle, or destructive device.', 0, 500),
    ('Criminal Possession of Weapon Class B', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Possession of a Class B weapon, such as a sawed-off shotgun, handgun, or large-capacity magazine.', 0, 1000),
    ('Criminal Possession of Weapon Class C', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Possession of a Class C weapon, such as a rifle, shotgun, or ammunition.', 0, 3500),
    ('Criminal Possession of Weapon Class D', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Possession of a Class D weapon, such as a knife, club, or brass knuckles.', 0, 1500),
    ('Criminal Sale of Weapon Class A', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Sale of a Class A weapon to a prohibited person.', 0, 1000),
    ('Criminal Sale of Weapon Class B', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Sale of a Class B weapon to a prohibited person.', 0, 2000),
    ('Criminal Sale of Weapon Class C', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Sale of a Class C weapon to a prohibited person.', 0, 7000),
    ('Criminal Sale of Weapon Class D', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Sale of a Class D weapon to a prohibited person.', 0, 3000),
    ('Criminal Use of Weapon', 'misdemeanor', 'OFFENSES AGAINST PUBLIC SAFETY', 'Use of a weapon in a threatening or dangerous manner, such as pointing it at another person or brandishing it in public.', 0, 450),
    ('Possession of Illegal Firearm Modifications', 'misdemeanor', 'OFFENSES AGAINST PUBLIC SAFETY', 'Possession of illegal modifications to a firearm, such as a silencer or a bump stock, that make it more dangerous.', 0, 300),
    ('Weapon Trafficking', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'The transportation of weapons across state lines without the proper permits.', 30, 10000),
    ('Brandishing a Weapon', 'misdemeanor', 'OFFENSES AGAINST PUBLIC SAFETY', 'Exposing a weapon in a threatening manner, such as by drawing it in public or waving it around.', 0, 500),
    ('Insurrection', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'The act of violently overthrowing or attempting to overthrow the government, such as by taking up arms against it.', 20, 3500),
    ('Flying into Restricted Airspace', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Flying an aircraft into restricted airspace, such as an airport or military base.', 0, 1500),
    ('Jaywalking', 'infraction', 'OFFENSES AGAINST PUBLIC SAFETY', 'Crossing a street illegally, such as by not using a crosswalk or by jaywalking in the middle of the street.', 0, 150),
    ('Criminal Use of Explosives', 'felony', 'OFFENSES AGAINST PUBLIC SAFETY', 'Use of explosives in a dangerous or threatening manner, such as by setting off a bomb or throwing a firecracker at someone.', 0, 2500);

-- OFFENSES INVOLVING THE OPERATION OF A VEHICLE
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Driving While Intoxicated', 'misdemeanor', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Operating a motor vehicle while under the influence of alcohol or drugs.', 0, 300),
    ('Evading', 'misdemeanor', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Failing to stop for a police officer or fleeing from a traffic stop.', 0, 400),
    ('Reckless Evading', 'felony', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Evading a police officer in a reckless manner, such as driving at high speeds or driving on the wrong side of the road.', 0, 800),
    ('Failure to Yield to Emergency Vehicle', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Failing to yield the right of way to an emergency vehicle, such as a fire truck or ambulance.', 0, 600),
    ('Failure to Obey Traffic Control Device', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Failing to obey a traffic control device, such as a stop sign or traffic light.', 0, 150),
    ('Nonfunctional Vehicle', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Operating a vehicle that is not in safe working condition.', 0, 75),
    ('Negligent Driving', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Operating a motor vehicle in a careless or reckless manner that could cause an accident.', 0, 300),
    ('Reckless Driving', 'misdemeanor', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Operating a motor vehicle in a wanton or willful manner that could cause an accident.', 0, 750),
    ('Third Degree Speeding', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Driving over the speed limit by 1-15 mph.', 0, 225),
    ('Second Degree Speeding', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Driving over the speed limit by 16-25 mph.', 0, 450),
    ('First Degree Speeding', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Driving over the speed limit by 26-35 mph.', 0, 750),
    ('Unlicensed Operation of Vehicle', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Operating a motor vehicle without a valid driver\'s license.', 0, 500),
    ('Illegal U-Turn', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Making an illegal U-turn, such as in the middle of an intersection.', 0, 75),
    ('Illegal Passing', 'infraction', 'OFFENSES INVOLVING THE OPERATION OF A VEHICLE', 'Passing another vehicle in a prohibited area, such as on a solid yellow line.', 0, 300);

-- OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE
INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Hunting in Restricted Areas', 'Infraction', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Hunting in an area that is closed to hunting, such as a wildlife refuge or national park.', 0, 450),
    ('Unlicensed Hunting', 'Infraction', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Hunting without a valid hunting license.', 0, 450),
    ('Animal Cruelty', 'Misdemeanor', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Willfully and intentionally causing pain, suffering, or death to an animal.', 0, 450),
    ('Hunting with a Non-Hunting Weapon', 'Misdemeanor', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Hunting with a weapon that is not designed for hunting, such as a bow and arrow or a spear.', 0, 750),
    ('Hunting outside of hunting hours', 'Infraction', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Hunting during a time period when hunting is not allowed, such as during closed season or at night.', 0, 750),
    ('Overhunting', 'Misdemeanor', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Hunting more animals than is allowed by law.', 0, 1000),
    ('Poaching', 'Felony', 'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE', 'Hunting or trapping wildlife illegally, such as without a license or in a closed area.', 0, 1250);
