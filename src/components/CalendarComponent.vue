<template>
  <div class="calendar">
    <table>
      <thead>
        <tr>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in this.events" :key="event.id">
          <td v-for="(day, index) in days" :key="day" :class="{ 'event-cell': isEventOnDay(event, index+1) }">
            <div v-if="isEventOnDay(event, index+1)">
              {{ event.name }}
              <br />
              {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
  props: {
    events: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  mounted(){
    console.log(this.events);
  },
  data() {
    return {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
  methods: {
    isEventOnDay(event, dayIndex) {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const eventDay = eventStart.getDay();
      console.log(event.start)
      console.log(dayIndex);
      console.log(eventDay === dayIndex);
      console.log(eventEnd.getTime() > eventStart.getTime());
      console.log(eventStart.getTime() >= this.getStartDateForDay(dayIndex).getTime());
      console.log(eventStart.getTime());
      console.log(this.getEndDateForDay(dayIndex).getTime());
      console.log(eventStart.getTime() > this.getEndDateForDay(dayIndex).getTime());

      return (
        eventDay === dayIndex &&
        eventEnd.getTime() > eventStart.getTime() &&
        eventStart.getTime() >= this.getStartDateForDay(dayIndex).getTime() &&
        eventStart.getTime() > this.getEndDateForDay(dayIndex).getTime()
      );
    },
    getStartDateForDay(dayIndex) {
      const date = new Date();
      const currentDate = date.getDate();
      const currentDay = date.getDay();

      // calculate the number of days to subtract to get to Monday
      let daysToSubtract = currentDay - 1;
      if (currentDay === 0) {
        daysToSubtract = 6;
      }

      const diff = currentDate - daysToSubtract + (dayIndex === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
    getEndDateForDay(dayIndex) {
      const date = new Date();
      const currentDate = date.getDate();
      const currentDay = date.getDay();

      // calculate the number of days to subtract to get to Monday
      let daysToSubtract = currentDay - 1;
      if (currentDay === 0) {
        daysToSubtract = 6;
      }

      const diff = currentDate - daysToSubtract + (dayIndex === 0 ? -6 : 1);
      const startDate = new Date(date.setDate(diff));
      return new Date(startDate.setDate(startDate.getDate() + 1));
    },
    formatTime(time) {
      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.event-cell {
  background-color: #293288;
}
</style>