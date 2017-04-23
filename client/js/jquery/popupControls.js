      $('#cmp').on('click', function(){
               $('.wrap, #cmp').toggleClass('active');
               $('.wrap1, #cmp2').toggleClass('active',false);
         });

      $('#ds1cmp').on('click', function(){
              $('.wrap, #cmp').toggleClass('active',false);
         });

      $('#ds2cmp').on('click', function(){
              $('.wrap, #cmp').toggleClass('active',false);
        });
                       
      $('#cmp2').on('click', function(){
             $('.wrap1, #cmp3').toggleClass('active',false);
             $('.wrap1, #cmp2').toggleClass('active');
             $('.wrap, #cmp').toggleClass('active',false);
       });
                
      $('#cmp3').on('click', function(){
              $('.wrap1, #cmp2').toggleClass('active',false);
              $('.wrap1, #cmp3').toggleClass('active');
              $('.wrap, #cmp').toggleClass('active',false);
       });
                      
      $('#cmp4').on('click', function(){
              $('.wrap1, #cmp2').toggleClass('active',false);
              $('.wrap1, #cmp3').toggleClass('active',false);
              $('.wrap1, #cmp4').toggleClass('active');
              $('.wrap, #cmp').toggleClass('active',false);
        });
                      
       $('#bttcl').on('click',function(){
             $('.wrap1, #cmp2,#cmp3,#cmp4').toggleClass('active',false);
        });

    

         