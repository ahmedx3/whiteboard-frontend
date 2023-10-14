<template>
    <div>
        <CourseCard v-for="(course, i) in courses" :key="i" :course="course"></CourseCard>
    </div>
</template>

<script>
import CourseCard from '@/components/course/CourseCard.vue';

export default {
    name: 'CourseBrowser',
    components: {
        CourseCard,
    },
    props: {
        courses: [],
    },
    data() {
        return {
            
        }
    },
}
</script>