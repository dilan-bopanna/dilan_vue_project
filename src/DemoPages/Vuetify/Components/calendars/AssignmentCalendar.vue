<template>
  <v-layout wrap>
    <v-flex sm12 lg12 class="pa-3 mb-3">
     
      <v-select v-model="type" :items="typeOptions" style="width: 110px;position: absolute;top: -5px;right: 7px;padding: 0px;margin: 0px;"></v-select>
     
    </v-flex>
    <v-flex sm12 lg12 class="pl-3">
      <v-sheet height="500">
        <v-calendar ref="calendar"  v-model="start" :type="type"
          :start="start" :end="end" :min-weeks="minWeeks"
          :max-days="maxDays"  :now="now"  :dark="dark" :weekdays="weekdays" :first-interval="intervals.first"
          :interval-minutes="intervals.minutes" :interval-count="intervals.count" :interval-height="intervals.height"
          :interval-style="intervalStyle" :show-interval-label="showIntervalLabel" :color="color">
          <template v-slot:day="day">
            <div v-if="day.day % 3 === 0" class="day">Send Assignment {{ day.date }}</div>
          </template>
          <template v-slot:header="day">
            <div v-if="day.weekday % 2" class="day-header">day-header slot {{ day.date }}</div>
          </template>
          
          <template v-slot:day-body="day">
            <div v-if="day.weekday % 3 === 2" class="day-body">Assignment due Name {{ day.date }}</div>

          

          </template>
         

        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

const intervalsDefault = {
  first:8,
  minutes: 60,
  count: 14,
  height: 40
};

const stylings = {
  default() {
    return undefined;
  },
  workday(interval) {
    const inactive =
      interval.weekday === 0 ||
      interval.weekday === 6 ||
      interval.hour < 9 ||
      interval.hour >= 17;
    const startOfHour = interval.minute === 0;
    const dark = this.dark;
    const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

    return {
      backgroundColor: inactive
        ? dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined,
      borderTop: startOfHour ? undefined : "1px dashed " + mid
    };
  },
  past(interval) {
    return {
      backgroundColor: interval.past
        ? this.dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined
    };
  }
};

export default {
  data: () => ({
    dark: false,
    startMenu: false,
    start: "2020-11-09",
    endMenu: false,
    end: "2020-11-09",
    nowMenu: false,
    minWeeks: 1,
    now: null,
    type: "week",
    typeOptions: [
      { text: "Day", value: "day" },
     { text: "Week", value: "week" },
      { text: "Month", value: "month" }
     
    ],
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: "Sunday - Saturday", value: weekdaysDefault },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] }
    ],
    intervals: intervalsDefault,
    intervalsOptions: [
      { text: "Default", value: intervalsDefault },
      {
        text: "Workday",
        value: { first: 16, minutes: 30, count: 20, height: 40 }
      }
    ],
    maxDays: 7,
    maxDaysOptions: [
      { text: "7 days", value: 7 },
      { text: "5 days", value: 5 },
      { text: "4 days", value: 4 },
      { text: "3 days", value: 3 }
    ],
    styleInterval: "default",
    styleIntervalOptions: [
      { text: "Default", value: "default" },
      { text: "Workday", value: "workday" },
      { text: "Past", value: "past" }
    ],
    color: "primary",
    colorOptions: [
      { text: "Primary", value: "primary" },
      { text: "Secondary", value: "secondary" },
      { text: "Accent", value: "accent" },
      { text: "Red", value: "red" },
      { text: "Pink", value: "pink" },
      { text: "Purple", value: "purple" },
      { text: "Deep Purple", value: "deep-purple" },
      { text: "Indigo", value: "indigo" },
      { text: "Blue", value: "blue" },
      { text: "Light Blue", value: "light-blue" },
      { text: "Cyan", value: "cyan" },
      { text: "Teal", value: "teal" },
      { text: "Green", value: "green" },
      { text: "Light Green", value: "light-green" },
      { text: "Lime", value: "lime" },
      { text: "Yellow", value: "yellow" },
      { text: "Amber", value: "amber" },
      { text: "Orange", value: "orange" },
      { text: "Deep Orange", value: "deep-orange" },
      { text: "Brown", value: "brown" },
      { text: "Blue Gray", value: "blue-gray" },
      { text: "Gray", value: "gray" },
      { text: "Black", value: "black" }
    ]
  }),
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this);
    },
    hasIntervals() {
      return (
        this.type in
        {
          week: 1,
          day: 1,
          "4day": 1,
          "custom-daily": 1
        }
      );
    },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1
        }
      );
    }
  },
  methods: {
    showIntervalLabel(interval) {
      return interval.minute === 0;
    }
  }
};
</script>

<style scoped>
.feature-pane {
  position: relative;
  padding-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.day-header {
  margin: 0px 2px 2px 2px;
  padding: 2px 6px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  border-radius: 2px;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.day-body {
  position: absolute;
  top: 400px;
  height: 36px;
  margin: 2px;
  padding: 2px 6px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  border-radius: 2px;
  left: 0;
  right: 0;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.day {
  position: relative;
  height: 24px;
  margin: 0px;
  padding: 0px 6px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  border-radius: 2px;
  left: 0;
  right: 0;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.v-calendar-daily__pane{padding-top: 6px;}
</style>
