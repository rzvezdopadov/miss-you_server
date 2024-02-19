import { TransformData } from '../utils/transformData';

export enum Gender {
    MALE,
    FEMALE,
}

export const GenderArr = TransformData.NumericEnumToArr(Gender);

export enum GenderVapor {
    MALE,
    FEMALE,
    ALL,
}

export const GenderVaporArr = TransformData.NumericEnumToArr(GenderVapor);

export enum Weight {
    DoesntMatter,
    Thin,
    Sports,
    Average,
    ACoupleOfExtraPounds,
}

export const WeightArr = TransformData.NumericEnumToArr(Weight);

export enum Education {
    DoesntMatter,
    Average,
    IncompleteHigherEducation,
    Higher,
    AcademicDegree,
    SpecializedSecondary,
}

export const EducationArr = TransformData.NumericEnumToArr(Education);

export enum FieldOfActivity {
    DoesntMatter,
    DontWork,
    Education,
    Healthcare,
    Science,
    Culture,
    Trade,
    IT,
    OwnBusiness,
    Transport,
    Production,
    SeniorManagement,
    Jurisprudence,
    AdministrativeStaff,
    ArchitectureAndDesign,
    BanksInvestmentsLeasing,
    AccountingAndAudit,
    Veterinary,
    ArmedForces,
    PublicService,
    HotelBusiness,
    ExtractionOfRawMaterials,
    AuthoritiesAndLawEnforcement,
    Publishing,
    EntertainmentIndustry,
    Consulting,
    MarketingPR,
    ReligiousOrganizations,
    Agriculture,
    Sport,
    MassMedia,
    Insurance,
    ConstructionRealEstate,
    JudicialAuthorities,
    PersonnelManagementHR,
    Student,
}

export const FieldOfActivityArr =
    TransformData.NumericEnumToArr(FieldOfActivity);

export enum MaritalStatus {
    DoesntMatter,
    NotMarried,
    Divorced,
    Widow,
}

export const MaritalStatusArr = TransformData.NumericEnumToArr(MaritalStatus);

export enum Childrens {
    DoesntMatter,
    HaveNotChildren,
    LittleChildrenLiveTogether,
    LittleChildrenLiveSeparately,
    AdultChildrenLiveTogether,
    AdultChildrenLiveSeparately,
}

export const ChildrensArr = TransformData.NumericEnumToArr(Childrens);

export enum Religion {
    DoesntMatter,
    Atheism,
    Orthodoxy,
    Islam,
    Catholicism,
    Buddhism,
    Protestanism,
    Judaism,
}

export const ReligionArr = TransformData.NumericEnumToArr(Religion);

export enum Smoke {
    DoesntMatter,
    DontSmoke,
    SometimesSmoke,
}

export const SmokeArr = TransformData.NumericEnumToArr(Smoke);

export enum Alcohol {
    DoesntMatter,
    DontDrink,
    SometimesDrink,
}

export const AlcoholArr = TransformData.NumericEnumToArr(Alcohol);

export enum Profit {
    DoesntMatter,
    UpTo30k,
    UpTo50k,
    UpTo100k,
    UpTo200k,
    UpTo500k,
    Over500k,
}

export const ProfitArr = TransformData.NumericEnumToArr(Profit);
