<script setup lang="ts">
import { computed } from 'vue'
import CalloutCard from '@/components/ui/CalloutCard.vue'

interface Props {
  tab: 'mission' | 'programs' | 'impact' | 'community'
}

const props = defineProps<Props>()

interface CalloutItem {
  id: string
  title: string
  value: string
  detail: string
  dotSide: 'left' | 'right' | 'top' | 'bottom'
  positionClass: string
}

const CALLOUT_SETS: Record<Props['tab'], CalloutItem[]> = {
  mission: [
    {
      id: 'c1',
      title: 'Origin',
      value: '2014',
      detail: 'Gothenburg, Sweden',
      dotSide: 'right',
      positionClass: 'top-[10%] left-[4%] sm:left-[8%]',
    },
    {
      id: 'c2',
      title: 'Aero Efficiency',
      value: '0.198 Cd',
      detail: 'Active carbon flaps',
      dotSide: 'left',
      positionClass: 'top-[16%] right-[4%] sm:right-[10%]',
    },
    {
      id: 'c3',
      title: 'Sustainability',
      value: '100% EV',
      detail: 'Zero tailpipe emissions',
      dotSide: 'right',
      positionClass: 'bottom-[12%] left-[6%] sm:left-[12%]',
    },
    {
      id: 'c4',
      title: 'Design Honor',
      value: 'Red Dot 2026',
      detail: 'Best of the Best',
      dotSide: 'left',
      positionClass: 'bottom-[16%] right-[6%] sm:right-[14%]',
    },
  ],
  programs: [
    {
      id: 'c1',
      title: 'Powertrain',
      value: '1,150 HP',
      detail: 'Dual SiC motors',
      dotSide: 'right',
      positionClass: 'top-[10%] left-[4%] sm:left-[8%]',
    },
    {
      id: 'c2',
      title: 'Acceleration',
      value: '1.9 sec',
      detail: '0-100 km/h sprint',
      dotSide: 'left',
      positionClass: 'top-[16%] right-[4%] sm:right-[10%]',
    },
    {
      id: 'c3',
      title: 'Architecture',
      value: '900V SiC',
      detail: 'Submerged cooling',
      dotSide: 'right',
      positionClass: 'bottom-[12%] left-[6%] sm:left-[12%]',
    },
    {
      id: 'c4',
      title: 'Cornering Force',
      value: '1.65 G',
      detail: 'Active downforce wing',
      dotSide: 'left',
      positionClass: 'bottom-[16%] right-[6%] sm:right-[14%]',
    },
  ],
  impact: [
    {
      id: 'c1',
      title: 'Fleet Distance',
      value: '+48M km',
      detail: 'Clean road mileage',
      dotSide: 'right',
      positionClass: 'top-[10%] left-[4%] sm:left-[8%]',
    },
    {
      id: 'c2',
      title: 'Battery Circularity',
      value: '94.8%',
      detail: 'Closed loop hydromet',
      dotSide: 'left',
      positionClass: 'top-[16%] right-[4%] sm:right-[10%]',
    },
    {
      id: 'c3',
      title: 'Assembly Energy',
      value: '100% Green',
      detail: 'Wind & geothermal',
      dotSide: 'right',
      positionClass: 'bottom-[12%] left-[6%] sm:left-[12%]',
    },
    {
      id: 'c4',
      title: 'Local Emissions',
      value: '0.0 g/km',
      detail: 'Pure electric drive',
      dotSide: 'left',
      positionClass: 'bottom-[16%] right-[6%] sm:right-[14%]',
    },
  ],
  community: [
    {
      id: 'c1',
      title: 'Global Drivers',
      value: '4,200+',
      detail: 'In 28 countries',
      dotSide: 'right',
      positionClass: 'top-[10%] left-[4%] sm:left-[8%]',
    },
    {
      id: 'c2',
      title: 'Annual Track Days',
      value: '32 Events',
      detail: 'FIA-graded circuits',
      dotSide: 'left',
      positionClass: 'top-[16%] right-[4%] sm:right-[10%]',
    },
    {
      id: 'c3',
      title: 'Club Apex',
      value: 'VIP Paddock',
      detail: 'Trackside hospitality',
      dotSide: 'right',
      positionClass: 'bottom-[12%] left-[6%] sm:left-[12%]',
    },
    {
      id: 'c4',
      title: 'Telemetry Cloud',
      value: 'OTA Analysis',
      detail: 'Millisecond resolution',
      dotSide: 'left',
      positionClass: 'bottom-[16%] right-[6%] sm:right-[14%]',
    },
  ],
}

const currentCallouts = computed(() => CALLOUT_SETS[props.tab])
</script>

<template>
  <div class="pointer-events-none absolute inset-0 select-none">
    <TransitionGroup name="swap">
      <div
        v-for="(item, idx) in currentCallouts"
        :key="item.title"
        :class="['pointer-events-auto absolute', item.positionClass]"
      >
        <CalloutCard
          :title="item.title"
          :value="item.value"
          :detail="item.detail"
          :dot-side="item.dotSide"
          :index="idx"
        />
      </div>
    </TransitionGroup>
  </div>
</template>
