import { LngLat, type LngLatLike, type Map } from 'maplibre-gl';
import type { IControl } from 'maplibre-gl';

type RecenterOptions = {
  center: LngLatLike;
  zoom: number;
  fly?: boolean;
};

const defaultOptions: Partial<RecenterOptions> = {
  fly: true
};

export default class RecenterControl implements IControl {
  options: RecenterOptions;
  _map: Map|undefined;
  _container: HTMLElement|undefined;
  _button: HTMLButtonElement|undefined;

  constructor(options: RecenterOptions) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  onAdd(map: Map) {
    this._map = map;

    this._button = document.createElement('button');
    this._button.className = 'maplibregl-ctrl-recenter-map';
    this._button.type = 'button';
    this._button.title = 'Recenter'
    this._button.ariaLabel = 'Recenter';

    const buttonIcon = document.createElement('span');
    buttonIcon.classList.add('maplibregl-ctrl-icon');
    this._button.appendChild(buttonIcon);

    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    this._container.appendChild(this._button);

    this._button.addEventListener('click', () => this._recenter());
    return this._container;
  }

  onRemove() {
    this._map = undefined;
    this._container?.parentNode?.removeChild(this._container);
  }

  _recenter() {
    const centerLatLng = LngLat.convert(this.options.center);
    if (this.options.fly) {
      this._map!.flyTo({
        center: centerLatLng,
        zoom: this.options.zoom
      });
    } else {
      this._map!.jumpTo({center: centerLatLng, zoom: this.options.zoom});
    }
  }
}
