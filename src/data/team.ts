export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  tags: string[]
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Chief Design Officer',
    bio: 'Former principal aerodynamicist at Sauber Motorsport; pioneered Apex’s minimal continuous line language.',
    image: '/src/assets/images/team-1.jpg',
    tags: ['Aero', 'Industrial Design'],
  },
  {
    id: 'marcus-lindqvist',
    name: 'Dr. Marcus Lindqvist',
    role: 'Head of Powertrain & Silicon',
    bio: 'Pioneered high-voltage silicon-carbide inverter topologies across 25 years of Swedish automotive R&D.',
    image: '/src/assets/images/team-2.jpg',
    tags: ['900V SiC', 'Battery Tech'],
  },
  {
    id: 'amara-okonkwo',
    name: 'Amara Okonkwo',
    role: 'VP Vehicle Dynamics & Software',
    bio: 'Lead test driver and chassis development architect. Responsible for Apex torque vectoring algorithms.',
    image: '/src/assets/images/team-3.jpg',
    tags: ['Torque Vectoring', 'Telemetry'],
  },
  {
    id: 'dev-patel',
    name: 'Dev Patel',
    role: 'Head of Sustainable Manufacturing',
    bio: 'Spearheaded zero-waste aluminum closed loop manufacturing and cradle-to-cradle material sourcing.',
    image: '/src/assets/images/team-4.jpg',
    tags: ['Closed Loop', 'Net-Zero'],
  },
]
