import { MOCK_USER_SETTINGS } from "../../data/mockData";

export const Settings = () => {
  const u = MOCK_USER_SETTINGS;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Profil et préférences fictifs — à relier au compte utilisateur plus tard.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Compte
        </h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-xs text-gray-500">Nom affiché</dt>
            <dd className="font-medium text-gray-900">{u.nom}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">E-mail</dt>
            <dd className="font-medium text-gray-900">{u.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Volière</dt>
            <dd className="font-medium text-gray-900">{u.voliere}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Ville</dt>
            <dd className="font-medium text-gray-900">{u.ville}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Application
        </h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-xs text-gray-500">Fuseau horaire</dt>
            <dd className="font-medium text-gray-900">{u.fuseau}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Distance</dt>
            <dd className="font-medium text-gray-900">{u.uniteDistance}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Langue</dt>
            <dd className="font-medium text-gray-900">{u.langue}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-gray-500">
          Les champs modifiables et la sauvegarde arriveront avec l’API.
        </p>
      </section>
    </div>
  );
};
