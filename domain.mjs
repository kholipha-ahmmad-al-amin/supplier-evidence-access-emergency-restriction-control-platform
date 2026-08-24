import { randomUUID } from 'node:crypto';
const transitions = {
  assess: { role: 'risk_reviewer', predecessor: 'declared', status: 'assessed', reference: 'assessmentReference' },
  restrict: { role: 'access_authority', predecessor: 'assessed', status: 'restricted', reference: 'restrictionReference' },
  notify: { role: 'restriction_operator', predecessor: 'restricted', status: 'notified', reference: 'notificationReference' },
  resolve: { role: 'assurance_reviewer', predecessor: 'notified', status: 'resolved', reference: 'resolutionReference' }
};
const text = (value, label) => { if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} is required`); return value.trim(); };
const actor = (value) => ({ id: text(value?.id, 'actor id'), role: text(value?.role, 'actor role') });
const copy = (value) => JSON.parse(JSON.stringify(value));
export class EmergencyRestrictionService {
  constructor(store, clock = () => new Date().toISOString()) { this.store = store; this.clock = clock; }
  list() { return this.store.read().restrictions.map(copy); }
  declare(input, suppliedActor) {
    const reporter = actor(suppliedActor); if (reporter.role !== 'emergency_reporter') throw new Error('actor role emergency_reporter is required to declare a restriction');
    const now = this.clock(); const restriction = { id: randomUUID(), supplier: text(input?.supplier, 'supplier'), evidenceReference: text(input?.evidenceReference, 'evidence reference'), threatSummary: text(input?.threatSummary, 'threat summary'), requestedScope: text(input?.requestedScope, 'requested scope'), status: 'declared', createdAt: now, updatedAt: now, auditEvents: [this.#event('restriction_declared', reporter, now, { threatSummary: input.threatSummary.trim() })] };
    const snapshot = this.store.read(); snapshot.restrictions.push(restriction); this.store.write(snapshot); return copy(restriction);
  }
  assess(id, input, suppliedActor) { return this.#move(id, 'assess', input, suppliedActor); }
  restrict(id, input, suppliedActor) { return this.#move(id, 'restrict', input, suppliedActor); }
  notify(id, input, suppliedActor) { return this.#move(id, 'notify', input, suppliedActor); }
  resolve(id, input, suppliedActor) { return this.#move(id, 'resolve', input, suppliedActor); }
  #move(id, action, input, suppliedActor) { const rule = transitions[action]; const currentActor = actor(suppliedActor); if (currentActor.role !== rule.role) throw new Error(`actor role ${rule.role} is required to ${action}`); const reference = text(input?.[rule.reference], rule.reference.replace(/Reference$/, ' reference')); const snapshot = this.store.read(); const item = snapshot.restrictions.find((candidate) => candidate.id === id); if (!item) throw new Error('emergency restriction not found'); if (item.status !== rule.predecessor) throw new Error(`cannot ${action} a restriction in ${item.status} status`); const now = this.clock(); item.status = rule.status; item.updatedAt = now; item[rule.reference] = reference; item.auditEvents.push(this.#event(`restriction_${rule.status}`, currentActor, now, { [rule.reference]: reference })); this.store.write(snapshot); return copy(item); }
  #event(type, currentActor, occurredAt, details) { return { id: randomUUID(), type, actorId: currentActor.id, actorRole: currentActor.role, occurredAt, details }; }
}
