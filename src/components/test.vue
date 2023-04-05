<template>
  <div class="calendar">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="(day, index) in daysOfWeek" :key="index">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in calendarRows" :key="index">
          <td>{{ row.time }}</td>
          <td v-for="(day, dayIndex) in daysOfWeek" :key="dayIndex">
            <div
              v-for="event in filteredEvents(day, row)"
              :key="event.id"
              class="event"
            >
              {{ event.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          id: 1,
          name: "Meeting",
          startDay: "Monday",
          startTime: "10:00",
          endTime: "11:00",
        },
        {
          id: 2,
          name: "Lunch",
          startDay: "Wednesday",
          startTime: "12:30",
          endTime: "13:30",
        },
        {
          id: 3,
          name: "Appointment",
          startDay: "Friday",
          startTime: "14:00",
          endTime: "15:00",
        },
      ],
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      startTime: "08:00",
      endTime: "20:00",
      timeInterval: "30",
    };
  },
  computed: {
    calendarRows() {
      const rows = [];
      let currentTime = this.startTime;
      while (currentTime <= this.endTime) {
        rows.push({ time: currentTime });
        currentTime = this.addMinutes(currentTime, this.timeInterval);
      }
      return rows;
    },
    filteredEvents() {
      return (day, row) => {
        return this.events.filter((event) => {
          return event.startDay === day && this.isEventInRange(event, row);
        });
      };
    },
  },
  methods: {
    addMinutes(time, minutes) {
      let [hours, mins] = time.split(":");
      let timeInMins = parseInt(hours) * 60 + parseInt(mins);
      timeInMins += minutes;
      let newHours = Math.floor(timeInMins / 60);
      let newMins = timeInMins % 60;
      return `${newHours.toString().padStart(2, "0")}:${newMins
        .toString()
        .padStart(2, "0")}`;
    },
    isEventInRange(event, row) {
      const start = this.convertTimeToMinutes(event.startTime);
      const end = this.convertTimeToMinutes(event.endTime);
      const rowStart = this.convertTimeToMinutes(row.time);
      const rowEnd = this.convertTimeToMinutes(
        this.addMinutes(row.time, this.timeInterval)
      );
      return start >= rowStart && end <= rowEnd;
    },
    convertTimeToMinutes(time) {
      const [hours, minutes] = time.split(":");
      return parseInt(hours) * 60 + parseInt(minutes);
    },
  },
};
</script>
