import { uuid } from 'vue3-uuid';

export function generateUUId() {
    return uuid.v4()
}