/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            name: 'small',
            width: 320,
            height: 240,
            separator: '_',
            suffix: '1x',
            quality: 30
        },
        {
          name: 'small',
          width: 320,
          height: 240,
          separator: '_',
          suffix: '2x',
          quality: 60
        },
        {
            name: 'medium',
            width: 640,
            separator: '_',
            suffix: '1x',
            quality: 30
        },
        {
            name: 'medium',
            width: 640,
            separator: '_',
            suffix: '2x',
            quality: 60
        },
        {
            name: 'large',
            width: 1024,
            separator: '_',
            suffix: '1x',
            quality: 30
        },
        {
            name: 'large',
            width: 1024,
            separator: '_',
            suffix: '2x',
            quality: 60
        }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'img_optim/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img_optim'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img_optim']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'img/fixed/*.{gif,jpg,png}',
          dest: 'img_optim/'
        }]
      },
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
