import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Vehiculo,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaVehiculoController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Vehiculo> {
    return this.personaRepository.vehiculo(id);
  }
}
