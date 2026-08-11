/**
 * Gabarits de traduction avec repères `{n}` plutôt que des fonctions dans le
 * dictionnaire : le dictionnaire ne doit contenir que des valeurs sérialisables
 * (chaînes, tableaux, objets simples). Une fonction dans un objet transmis en
 * prop d'un composant serveur vers un composant client fait échouer le rendu
 * ("Functions cannot be passed directly to Client Components") — c'est
 * précisément ce que fait `DictionaryProvider` pour la partie `tunnel`.
 */
type Params = Record<string, string | number>;

export function format(template: string, params: Params): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  );
}

export type PluralForms = { one: string; other: string };

/**
 * Convention reprise du reste du code (`${n} fichier${n > 1 ? "s" : ""}`) :
 * la forme plurielle s'applique au-delà de 1, y compris pour 0.
 */
export function plural(n: number, forms: PluralForms): string {
  return format(n > 1 ? forms.other : forms.one, { n });
}
