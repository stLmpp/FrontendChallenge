import { TrackByFunction } from '@angular/core';

export const trackById: TrackByFunction<{ id: number }> = (index, element) => element.id ?? index;
