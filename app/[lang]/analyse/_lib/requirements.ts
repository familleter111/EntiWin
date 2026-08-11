import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/i18n/text";
import type { ThemeId } from "./documents";

export type ReqStatus = "couverte" | "partielle" | "non-identifiee";
export type ReqCriticality = "elevee" | "moyenne" | "faible";

export type Requirement = {
  id: number;
  theme: ThemeId;
  label: LocalizedText;
  status: ReqStatus;
  criticality: ReqCriticality;
  /** Extrait du document justifiant le constat (null si rien n'a été trouvé). */
  evidence: { quote: LocalizedText; source: LocalizedText } | null;
  missing: LocalizedText[];
  recommendation: LocalizedText;
  /** Niveau de confiance de l'IA, en %. */
  confidence: number;
};

export const STATUS_LABEL: Record<ReqStatus, LocalizedText> = {
  couverte: { fr: "Couverte", en: "Covered", ar: "مستوفى" },
  partielle: {
    fr: "Partiellement couverte",
    en: "Partially covered",
    ar: "مستوفى جزئيًا",
  },
  "non-identifiee": {
    fr: "Non identifiée",
    en: "Not identified",
    ar: "غير محدّد",
  },
};

export const CRITICALITY_LABEL: Record<ReqCriticality, LocalizedText> = {
  elevee: { fr: "Élevée", en: "High", ar: "مرتفعة" },
  moyenne: { fr: "Moyenne", en: "Medium", ar: "متوسطة" },
  faible: { fr: "Faible", en: "Low", ar: "منخفضة" },
};

export const NO_MISSING: LocalizedText = {
  fr: "Aucun élément manquant relevé.",
  en: "No missing element identified.",
  ar: "لم تُرصد أي عناصر ناقصة.",
};

const NO_ACTION: LocalizedText = {
  fr: "Aucune action requise.",
  en: "No action required.",
  ar: "لا يلزم أي إجراء.",
};

/** Page N d'une section : la numérotation est la même dans les trois langues. */
const section = (fr: string, en: string, ar: string): LocalizedText => ({
  fr,
  en,
  ar,
});

/**
 * Résultat de démonstration : 24 exigences (15 couvertes, 6 partielles,
 * 3 non identifiées, 4 en criticité élevée). À remplacer par la sortie du
 * moteur d'analyse.
 */
export const REQUIREMENTS: Requirement[] = [
  {
    id: 1,
    theme: "deviations",
    label: {
      fr: "Vérification de l'efficacité des actions correctives",
      en: "Verification of corrective action effectiveness",
      ar: "التحقق من فعالية الإجراءات التصحيحية",
    },
    status: "partielle",
    criticality: "elevee",
    evidence: {
      quote: {
        fr: "…une revue des actions correctives est réalisée périodiquement…",
        en: "…a review of corrective actions is carried out periodically…",
        ar: "…تُجرى مراجعة دورية للإجراءات التصحيحية…",
      },
      source: section("Section 5.4, p.7", "Section 5.4, p.7", "القسم 5.4، ص.7"),
    },
    missing: [
      {
        fr: "Méthode de vérification non définie",
        en: "Verification method not defined",
        ar: "طريقة التحقق غير محدّدة",
      },
      {
        fr: "Fréquence non précisée",
        en: "Frequency not specified",
        ar: "الوتيرة غير محدّدة",
      },
      {
        fr: "Responsabilités non précisées",
        en: "Responsibilities not specified",
        ar: "المسؤوليات غير محدّدة",
      },
    ],
    recommendation: {
      fr: "Définir la méthode, la fréquence et les responsabilités de vérification.",
      en: "Define the verification method, frequency and responsibilities.",
      ar: "حدِّد طريقة التحقق ووتيرته والمسؤوليات المرتبطة به.",
    },
    confidence: 78,
  },
  {
    id: 2,
    theme: "deviations",
    label: {
      fr: "CAPA – Identification des causes racines",
      en: "CAPA – Root cause identification",
      ar: "الإجراءات التصحيحية والوقائية – تحديد الأسباب الجذرية",
    },
    status: "couverte",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…l'analyse des causes racines s'appuie sur la méthode des 5 pourquoi…",
        en: "…root cause analysis relies on the 5 whys method…",
        ar: "…يستند تحليل الأسباب الجذرية إلى منهجية «الأسباب الخمسة»…",
      },
      source: section("Section 4.2, p.5", "Section 4.2, p.5", "القسم 4.2، ص.5"),
    },
    missing: [],
    recommendation: {
      fr: "Conserver la méthode en place et tracer l'outil retenu pour chaque cas.",
      en: "Keep the current method and record the tool used for each case.",
      ar: "حافظوا على المنهجية المعتمدة ووثّقوا الأداة المستخدَمة في كل حالة.",
    },
    confidence: 94,
  },
  {
    id: 3,
    theme: "deviations",
    label: {
      fr: "Mise en œuvre des actions correctives",
      en: "Implementation of corrective actions",
      ar: "تنفيذ الإجراءات التصحيحية",
    },
    status: "couverte",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…chaque action est affectée à un pilote avec une échéance validée…",
        en: "…each action is assigned to an owner with an approved due date…",
        ar: "…يُسنَد كل إجراء إلى مسؤول مع أجل مصادَق عليه…",
      },
      source: section("Section 5.1, p.6", "Section 5.1, p.6", "القسم 5.1، ص.6"),
    },
    missing: [],
    recommendation: {
      fr: "Maintenir le suivi des échéances par pilote.",
      en: "Keep tracking due dates by owner.",
      ar: "واصلوا متابعة الآجال حسب المسؤول.",
    },
    confidence: 92,
  },
  {
    id: 4,
    theme: "deviations",
    label: {
      fr: "Suivi et vérification de l'efficacité",
      en: "Follow-up and effectiveness check",
      ar: "المتابعة والتحقق من الفعالية",
    },
    status: "partielle",
    criticality: "elevee",
    evidence: {
      quote: {
        fr: "…un point d'avancement est réalisé lors des revues qualité…",
        en: "…a progress review is held during quality reviews…",
        ar: "…يُجرى استعراض للتقدّم خلال مراجعات الجودة…",
      },
      source: section("Section 5.5, p.8", "Section 5.5, p.8", "القسم 5.5، ص.8"),
    },
    missing: [
      {
        fr: "Critères d'efficacité non formalisés",
        en: "Effectiveness criteria not formalised",
        ar: "معايير الفعالية غير موثَّقة",
      },
      {
        fr: "Preuve de clôture non exigée",
        en: "Closure evidence not required",
        ar: "دليل الإغلاق غير مطلوب",
      },
    ],
    recommendation: {
      fr: "Formaliser les critères d'efficacité et exiger une preuve avant clôture.",
      en: "Formalise the effectiveness criteria and require evidence before closure.",
      ar: "وثّقوا معايير الفعالية واشترطوا دليلًا قبل الإغلاق.",
    },
    confidence: 74,
  },
  {
    id: 5,
    theme: "deviations",
    label: {
      fr: "Documentation des actions correctives",
      en: "Documentation of corrective actions",
      ar: "توثيق الإجراءات التصحيحية",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…toute action corrective est enregistrée dans le registre CAPA…",
        en: "…every corrective action is recorded in the CAPA register…",
        ar: "…يُسجَّل كل إجراء تصحيحي في سجل الإجراءات التصحيحية والوقائية…",
      },
      source: section("Section 3.3, p.4", "Section 3.3, p.4", "القسم 3.3، ص.4"),
    },
    missing: [],
    recommendation: {
      fr: "Poursuivre l'enregistrement systématique au registre.",
      en: "Continue recording every action in the register.",
      ar: "واصلوا التسجيل المنهجي في السجل.",
    },
    confidence: 96,
  },
  {
    id: 6,
    theme: "deviations",
    label: {
      fr: "Revue périodique des actions correctives",
      en: "Periodic review of corrective actions",
      ar: "المراجعة الدورية للإجراءات التصحيحية",
    },
    status: "partielle",
    criticality: "elevee",
    evidence: {
      quote: {
        fr: "…une revue est organisée en fonction des besoins du service…",
        en: "…a review is organised according to the department's needs…",
        ar: "…تُنظَّم مراجعة بحسب حاجات المصلحة…",
      },
      source: section("Section 6.1, p.9", "Section 6.1, p.9", "القسم 6.1، ص.9"),
    },
    missing: [
      {
        fr: "Périodicité non fixée",
        en: "Frequency not set",
        ar: "الدورية غير محدَّدة",
      },
      {
        fr: "Participants non désignés",
        en: "Participants not designated",
        ar: "المشاركون غير معيَّنين",
      },
    ],
    recommendation: {
      fr: "Fixer une périodicité minimale et désigner les participants requis.",
      en: "Set a minimum frequency and designate the required participants.",
      ar: "حدِّدوا دورية دنيا وعيِّنوا المشاركين المطلوبين.",
    },
    confidence: 71,
  },
  {
    id: 7,
    theme: "deviations",
    label: {
      fr: "Responsabilités et autorités",
      en: "Responsibilities and authorities",
      ar: "المسؤوليات والصلاحيات",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…le responsable qualité valide la clôture de chaque déviation…",
        en: "…the quality manager approves the closure of each deviation…",
        ar: "…يصادق مسؤول الجودة على إغلاق كل انحراف…",
      },
      source: section("Section 2.1, p.3", "Section 2.1, p.3", "القسم 2.1، ص.3"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 95,
  },
  {
    id: 8,
    theme: "deviations",
    label: {
      fr: "Indicateurs et tendances CAPA",
      en: "CAPA indicators and trends",
      ar: "مؤشرات واتجاهات الإجراءات التصحيحية والوقائية",
    },
    status: "non-identifiee",
    criticality: "elevee",
    evidence: null,
    missing: [
      {
        fr: "Aucun indicateur de suivi identifié",
        en: "No monitoring indicator identified",
        ar: "لم يُحدَّد أي مؤشر للمتابعة",
      },
      {
        fr: "Aucune analyse de tendance documentée",
        en: "No documented trend analysis",
        ar: "لا يوجد تحليل اتجاهات موثَّق",
      },
    ],
    recommendation: {
      fr: "Définir des indicateurs CAPA et une analyse de tendance périodique.",
      en: "Define CAPA indicators and a periodic trend analysis.",
      ar: "حدِّدوا مؤشرات للإجراءات التصحيحية والوقائية وتحليل اتجاهات دوريًا.",
    },
    confidence: 88,
  },
  {
    id: 9,
    theme: "deviations",
    label: {
      fr: "Intégration avec le management des risques",
      en: "Integration with risk management",
      ar: "التكامل مع إدارة المخاطر",
    },
    status: "partielle",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…les déviations majeures font l'objet d'une évaluation du risque…",
        en: "…major deviations are subject to a risk assessment…",
        ar: "…تخضع الانحرافات الكبرى لتقييم للمخاطر…",
      },
      source: section("Section 4.6, p.6", "Section 4.6, p.6", "القسم 4.6، ص.6"),
    },
    missing: [
      {
        fr: "Lien avec l'analyse de risque produit non décrit",
        en: "Link to product risk analysis not described",
        ar: "الصلة بتحليل مخاطر المنتج غير موصوفة",
      },
    ],
    recommendation: {
      fr: "Décrire le lien entre déviation, CAPA et analyse de risque produit.",
      en: "Describe the link between deviation, CAPA and product risk analysis.",
      ar: "صِفوا الصلة بين الانحراف والإجراء التصحيحي وتحليل مخاطر المنتج.",
    },
    confidence: 80,
  },
  {
    id: 10,
    theme: "deviations",
    label: {
      fr: "Amélioration continue du système qualité",
      en: "Continuous improvement of the quality system",
      ar: "التحسين المستمر لنظام الجودة",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…les enseignements sont repris en revue de direction…",
        en: "…lessons learned are taken up in the management review…",
        ar: "…تُستعاد الدروس المستخلصة في مراجعة الإدارة…",
      },
      source: section("Section 7.2, p.11", "Section 7.2, p.11", "القسم 7.2، ص.11"),
    },
    missing: [],
    recommendation: {
      fr: "Maintenir la remontée en revue de direction.",
      en: "Keep escalating them to the management review.",
      ar: "واصلوا رفعها إلى مراجعة الإدارة.",
    },
    confidence: 91,
  },
  {
    id: 11,
    theme: "documentaire",
    label: {
      fr: "Historique de révision des documents",
      en: "Document revision history",
      ar: "سجل مراجعات الوثائق",
    },
    status: "non-identifiee",
    criticality: "moyenne",
    evidence: null,
    missing: [
      {
        fr: "Aucun historique de révision détecté",
        en: "No revision history detected",
        ar: "لم يُرصد أي سجل مراجعات",
      },
      {
        fr: "Motif de modification non consigné",
        en: "Reason for change not recorded",
        ar: "سبب التعديل غير مدوَّن",
      },
    ],
    recommendation: {
      fr: "Ajouter un tableau de révision daté et motivé dans chaque document.",
      en: "Add a dated revision table with the reason for change in every document.",
      ar: "أضيفوا جدول مراجعات مؤرَّخًا ومعلَّلًا في كل وثيقة.",
    },
    confidence: 86,
  },
  {
    id: 12,
    theme: "documentaire",
    label: {
      fr: "Approbation avant diffusion",
      en: "Approval before distribution",
      ar: "المصادقة قبل النشر",
    },
    status: "couverte",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…aucun document n'est diffusé sans double approbation…",
        en: "…no document is distributed without dual approval…",
        ar: "…لا تُنشر أي وثيقة دون مصادقة مزدوجة…",
      },
      source: section("Section 2.4, p.3", "Section 2.4, p.3", "القسم 2.4، ص.3"),
    },
    missing: [],
    recommendation: {
      fr: "Maintenir le circuit de double approbation.",
      en: "Keep the dual approval workflow.",
      ar: "حافظوا على مسار المصادقة المزدوجة.",
    },
    confidence: 93,
  },
  {
    id: 13,
    theme: "documentaire",
    label: {
      fr: "Diffusion contrôlée des versions",
      en: "Controlled distribution of versions",
      ar: "النشر المضبوط للنسخ",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…la liste de diffusion est tenue à jour par l'assurance qualité…",
        en: "…the distribution list is kept up to date by quality assurance…",
        ar: "…تتولى ضمان الجودة تحديث قائمة النشر…",
      },
      source: section("Section 3.1, p.4", "Section 3.1, p.4", "القسم 3.1، ص.4"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 90,
  },
  {
    id: 14,
    theme: "documentaire",
    label: {
      fr: "Retrait des versions obsolètes",
      en: "Withdrawal of obsolete versions",
      ar: "سحب النسخ الملغاة",
    },
    status: "couverte",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…les versions périmées sont retirées des postes de travail…",
        en: "…expired versions are removed from workstations…",
        ar: "…تُسحب النسخ المنتهية من مواقع العمل…",
      },
      source: section("Section 3.5, p.5", "Section 3.5, p.5", "القسم 3.5، ص.5"),
    },
    missing: [],
    recommendation: {
      fr: "Conserver la preuve de retrait pour chaque version.",
      en: "Keep the withdrawal evidence for every version.",
      ar: "احتفظوا بدليل السحب لكل نسخة.",
    },
    confidence: 89,
  },
  {
    id: 15,
    theme: "documentaire",
    label: {
      fr: "Archivage des documents qualité",
      en: "Archiving of quality documents",
      ar: "أرشفة وثائق الجودة",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…l'archivage est assuré pendant la durée réglementaire…",
        en: "…archiving is maintained for the regulatory retention period…",
        ar: "…تُضمن الأرشفة طوال المدة التنظيمية…",
      },
      source: section("Section 8.1, p.12", "Section 8.1, p.12", "القسم 8.1، ص.12"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 92,
  },
  {
    id: 16,
    theme: "documentaire",
    label: {
      fr: "Identification unique des documents",
      en: "Unique identification of documents",
      ar: "التعريف الفريد للوثائق",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…chaque document porte un code unique et un numéro de version…",
        en: "…each document carries a unique code and a version number…",
        ar: "…تحمل كل وثيقة رمزًا فريدًا ورقم نسخة…",
      },
      source: section("Section 2.2, p.3", "Section 2.2, p.3", "القسم 2.2، ص.3"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 97,
  },
  {
    id: 17,
    theme: "documentaire",
    label: {
      fr: "Périodicité de revue documentaire",
      en: "Document review frequency",
      ar: "دورية مراجعة الوثائق",
    },
    status: "partielle",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…les documents sont revus régulièrement…",
        en: "…documents are reviewed regularly…",
        ar: "…تُراجَع الوثائق بانتظام…",
      },
      source: section("Section 6.3, p.9", "Section 6.3, p.9", "القسم 6.3، ص.9"),
    },
    missing: [
      {
        fr: "Intervalle de revue non chiffré",
        en: "Review interval not quantified",
        ar: "الفاصل الزمني للمراجعة غير محدَّد رقميًا",
      },
    ],
    recommendation: {
      fr: "Chiffrer l'intervalle maximal entre deux revues.",
      en: "Quantify the maximum interval between two reviews.",
      ar: "حدِّدوا رقميًا الفاصل الأقصى بين مراجعتين.",
    },
    confidence: 76,
  },
  {
    id: 18,
    theme: "documentaire",
    label: {
      fr: "Gestion des formulaires et enregistrements",
      en: "Management of forms and records",
      ar: "إدارة الاستمارات والسجلات",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…les formulaires vierges sont référencés au même titre que les SOP…",
        en: "…blank forms are referenced in the same way as SOPs…",
        ar: "…تُرجَّع الاستمارات الفارغة كما تُرجَّع الإجراءات التشغيلية المعيارية…",
      },
      source: section("Section 4.1, p.6", "Section 4.1, p.6", "القسم 4.1، ص.6"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 90,
  },
  {
    id: 19,
    theme: "documentaire",
    label: {
      fr: "Traçabilité des modifications",
      en: "Traceability of changes",
      ar: "تتبُّع التعديلات",
    },
    status: "partielle",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…les modifications sont validées par le responsable du document…",
        en: "…changes are approved by the document owner…",
        ar: "…يصادق مالك الوثيقة على التعديلات…",
      },
      source: section("Section 5.2, p.7", "Section 5.2, p.7", "القسم 5.2، ص.7"),
    },
    missing: [
      {
        fr: "Nature de la modification non tracée",
        en: "Nature of the change not recorded",
        ar: "طبيعة التعديل غير موثَّقة",
      },
    ],
    recommendation: {
      fr: "Consigner la nature de chaque modification, pas seulement son auteur.",
      en: "Record the nature of every change, not only its author.",
      ar: "دوِّنوا طبيعة كل تعديل، لا صاحبه فحسب.",
    },
    confidence: 79,
  },
  {
    id: 20,
    theme: "documentaire",
    label: {
      fr: "Formation aux procédures applicables",
      en: "Training on applicable procedures",
      ar: "التدريب على الإجراءات المعمول بها",
    },
    status: "couverte",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…la formation est enregistrée avant application de la procédure…",
        en: "…training is recorded before the procedure is applied…",
        ar: "…يُسجَّل التدريب قبل تطبيق الإجراء…",
      },
      source: section("Section 7.1, p.10", "Section 7.1, p.10", "القسم 7.1، ص.10"),
    },
    missing: [],
    recommendation: {
      fr: "Maintenir l'enregistrement préalable des formations.",
      en: "Keep recording training before application.",
      ar: "واصلوا تسجيل التدريب مسبقًا.",
    },
    confidence: 88,
  },
  {
    id: 21,
    theme: "documentaire",
    label: {
      fr: "Contrôle des documents externes",
      en: "Control of external documents",
      ar: "ضبط الوثائق الخارجية",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…les normes externes sont identifiées et leur diffusion maîtrisée…",
        en: "…external standards are identified and their distribution controlled…",
        ar: "…تُحدَّد المعايير الخارجية ويُضبط نشرها…",
      },
      source: section("Section 3.8, p.5", "Section 3.8, p.5", "القسم 3.8، ص.5"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 87,
  },
  {
    id: 22,
    theme: "documentaire",
    label: {
      fr: "Sauvegarde et intégrité des données",
      en: "Backup and data integrity",
      ar: "النسخ الاحتياطي وسلامة البيانات",
    },
    status: "couverte",
    criticality: "moyenne",
    evidence: {
      quote: {
        fr: "…les sauvegardes sont quotidiennes et vérifiées mensuellement…",
        en: "…backups are daily and verified monthly…",
        ar: "…تُجرى النسخ الاحتياطية يوميًا ويُتحقَّق منها شهريًا…",
      },
      source: section("Section 9.2, p.13", "Section 9.2, p.13", "القسم 9.2، ص.13"),
    },
    missing: [],
    recommendation: {
      fr: "Maintenir le contrôle mensuel de restauration.",
      en: "Keep the monthly restore test.",
      ar: "حافظوا على اختبار الاستعادة الشهري.",
    },
    confidence: 91,
  },
  {
    id: 23,
    theme: "documentaire",
    label: {
      fr: "Habilitations d'accès documentaire",
      en: "Document access permissions",
      ar: "صلاحيات الوصول إلى الوثائق",
    },
    status: "non-identifiee",
    criticality: "moyenne",
    evidence: null,
    missing: [
      {
        fr: "Aucune matrice d'habilitation détectée",
        en: "No permission matrix detected",
        ar: "لم تُرصد أي مصفوفة صلاحيات",
      },
      {
        fr: "Revue des accès non documentée",
        en: "Access review not documented",
        ar: "مراجعة الوصول غير موثَّقة",
      },
    ],
    recommendation: {
      fr: "Établir une matrice d'habilitation et en planifier la revue annuelle.",
      en: "Establish a permission matrix and schedule its annual review.",
      ar: "ضعوا مصفوفة صلاحيات وبرمِجوا مراجعتها سنويًا.",
    },
    confidence: 84,
  },
  {
    id: 24,
    theme: "documentaire",
    label: {
      fr: "Revue de direction du système documentaire",
      en: "Management review of the document system",
      ar: "مراجعة الإدارة لنظام الوثائق",
    },
    status: "couverte",
    criticality: "faible",
    evidence: {
      quote: {
        fr: "…l'état du système documentaire est présenté en revue de direction…",
        en: "…the state of the document system is presented at the management review…",
        ar: "…تُعرض حالة نظام الوثائق في مراجعة الإدارة…",
      },
      source: section("Section 7.4, p.11", "Section 7.4, p.11", "القسم 7.4، ص.11"),
    },
    missing: [],
    recommendation: NO_ACTION,
    confidence: 93,
  },
];

export const CRITICALITIES: ReqCriticality[] = ["elevee", "moyenne", "faible"];

/** Poids d'une exigence dans le score : couverte 100 %, partielle 50 %. */
export const COVERAGE: Record<ReqStatus, number> = {
  couverte: 100,
  partielle: 50,
  "non-identifiee": 0,
};

export type Stats = {
  total: number;
  couvertes: number;
  partielles: number;
  nonIdentifiees: number;
  critiques: number;
  /** Couverture pondérée, en %. */
  score: number;
};

function statsOf(list: Requirement[]): Stats {
  const couvertes = list.filter((r) => r.status === "couverte").length;
  const partielles = list.filter((r) => r.status === "partielle").length;

  return {
    total: list.length,
    couvertes,
    partielles,
    nonIdentifiees: list.filter((r) => r.status === "non-identifiee").length,
    critiques: list.filter((r) => r.criticality === "elevee").length,
    score: list.length
      ? Math.round(((couvertes + partielles * 0.5) / list.length) * 100)
      : 0,
  };
}

/** Compteurs affichés dans la barre d'indicateurs. */
export function requirementStats(): Stats {
  return statsOf(REQUIREMENTS);
}

/** Mêmes compteurs, restreints à un thème (cartes « Scores par thème »). */
export function themeStats(theme: ThemeId): Stats {
  return statsOf(REQUIREMENTS.filter((r) => r.theme === theme));
}

export function requirementsOf(theme: ThemeId) {
  return REQUIREMENTS.filter((r) => r.theme === theme);
}

/** Libellé de statut prêt à afficher. */
export function statusLabel(status: ReqStatus, locale: Locale): string {
  return STATUS_LABEL[status][locale];
}

/** Libellé de criticité prêt à afficher. */
export function criticalityLabel(
  criticality: ReqCriticality,
  locale: Locale,
): string {
  return CRITICALITY_LABEL[criticality][locale];
}
