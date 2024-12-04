#include ".\include\Variable.h"
//0xD000 128*4=512 byte
code const U32 Fn1_KeyMatrix[2][128]={
{   
	//C00-------------------------------------------------------------------------------------------------------------0
	0x00,		KEY_ESC,				0x00,					0x00,							0x00,									SP_KB_Mode,     	 
	//C01-------------------------------------------------------------------------------------------------------------1
	0x00,		KEY_F1,					0x00,					SP_Windows_Mode,	0x00,									SP_Winlock,	
	//C02-------------------------------------------------------------------------------------------------------------2
	0x00,		KEY_F2,					0x00,					SP_Mac_Mode,			0x00,									0x00, 				 	 			
	//C03-------------------------------------------------------------------------------------------------------------3
	0x00,		KEY_F3,					0x00,					0x00,							0x00,									0x00,    					   
	//C04-------------------------------------------------------------------------------------------------------------4
	0x00,		KEY_F4,					0x00,					0x00,							0x00,									0x00,							  						 						
	//C05-------------------------------------------------------------------------------------------------------------5	
	0x00,		KEY_F5,					0x00,					SP_TEST_EMI,			0x00,									SP_ProfileReset,		 			 			    
	//C06-------------------------------------------------------------------------------------------------------------6
	0x00,		KEY_F6,					0x00,					0x00,							0x00,									0x00,		
	//C07-------------------------------------------------------------------------------------------------------------7
	0x00,		KEY_F7,					0x00,					0x00,							0x00,									0x00,
	//C08-------------------------------------------------------------------------------------------------------------8
	0x00,		KEY_F8,					0x00,					0x00,							KEY_LED_COLOR_MODEL,	0x00,			       			        
	//C09-------------------------------------------------------------------------------------------------------------9
	0x00,		KEY_F9,					SP_O_Mode,		SP_L_Mode,				0x00,				KEY_Fn1,						 
	//C10-------------------------------------------------------------------------------------------------------------10
	0x00,		KEY_F10,				0x00,					0x00,							0x00,							0x00,					 
	//C11-------------------------------------------------------------------------------------------------------------11
	0x00,		KEY_F11,				KEY_PAUSE,        KEY_SCRLOCK,					0x00,							0x00,			 
	//C12------- -----------------------------------------------------------------------------------------------------12
	0x00,		KEY_F12,				KEY_INS,			0x00,							0x00,							0x00,		    
	//C13--------------------------------------------------------------------------------------------------------13
	0x00,		SP_LED_REC,			KEY_LED_MODEL,0x00,							0x00,							KEY_LED_BREATHD, 	 	 	   	       
	//C14-------------------------------------------------------------------------------------------------------------14
	0x00,		0x00,						0x00,					0x00,					KEY_LED_LUMINI,				KEY_LED_LUMIND,     	         
	//C15-------------------------------------------------------------------------------------------------------------15
	0x00,		KEY_PRINT,			KEY_END,			KEY_HOME,					0x00,							KEY_LED_BREATHI,	 												   
	//C16-------------------------------------------------------------------------------------------------------------16
	
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,							 
	//C17-------------------------------------------------------------------------------------------------------------17
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,
	//C18-------------------------------------------------------------------------------------------------------------18
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,	
	//C19-------------------------------------------------------------------------------------------------------------19
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,
	//C20-------------------------------------------------------------------------------------------------------------20			
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,	
	//===============
	0,0
},
{   
	//C00-------------------------------------------------------------------------------------------------------------0
	0x00,		KEY_ESC,				0x00,					0x00,							0x00,									SP_KB_Mode,     	 
	//C01-------------------------------------------------------------------------------------------------------------1
	0x00,		KEY_MyComputer,	0x00,					SP_Windows_Mode,	0x00,									SP_Winlock,	
	//C02-------------------------------------------------------------------------------------------------------------2
	0x00,		KEY_WWW,				0x00,					SP_Mac_Mode,			0x00,									0x00, 				 	 			
	//C03-------------------------------------------------------------------------------------------------------------3
	0x00,		KEY_Email,			0x00,					0x00,							0x00,									0x00,    					   
	//C04-------------------------------------------------------------------------------------------------------------4
	0x00,		KEY_Calculator,	0x00,					0x00,							0x00,									0x00,							  						 						
	//C05-------------------------------------------------------------------------------------------------------------5	
	0x00,		KEY_Media,			0x00,					SP_TEST_EMI,			0x00,									SP_ProfileReset,		 			 			    
	//C06-------------------------------------------------------------------------------------------------------------6
	0x00,		KEY_Stop,				0x00,					0x00,							0x00,									0x00,		
	//C07-------------------------------------------------------------------------------------------------------------7
	0x00,		KEY_PrevTr,			0x00,					0x00,							0x00,									0x00,
	//C08-------------------------------------------------------------------------------------------------------------8
	0x00,		KEY_PlayPause,	0x00,					0x00,							KEY_LED_COLOR_MODEL,	0x00,			       			        
	//C09-------------------------------------------------------------------------------------------------------------9
	0x00,		KEY_NextTr,			SP_O_Mode,		SP_L_Mode,				0x00,				KEY_Fn1,						 
	//C10-------------------------------------------------------------------------------------------------------------10
	0x00,		KEY_Mute,				0x00,					0x00,							0x00,							0x00,					 
	//C11-------------------------------------------------------------------------------------------------------------11
	0x00,		KEY_VolumD,			KEY_PAUSE,					KEY_SCRLOCK,					0x00,							0x00,			 
	//C12------- -----------------------------------------------------------------------------------------------------12
	0x00,		KEY_VolumI,			KEY_INS,			0x00,							0x00,							0x00,		    
	//C13--------------------------------------------------------------------------------------------------------13
	0x00,		SP_LED_REC,			KEY_LED_MODEL,0x00,							0x00,							KEY_LED_BREATHD, 	 	 	   	       
	//C14-------------------------------------------------------------------------------------------------------------14
	0x00,		0x00,						0x00,					0x00,					KEY_LED_LUMINI,				KEY_LED_LUMIND,     	         
	//C15-------------------------------------------------------------------------------------------------------------15
	0x00,		KEY_PRINT,			KEY_END,			KEY_HOME,					0x00,							KEY_LED_BREATHI,	 												   
	//C16-------------------------------------------------------------------------------------------------------------16
	
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,							 
	//C17-------------------------------------------------------------------------------------------------------------17
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,
	//C18-------------------------------------------------------------------------------------------------------------18
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,	
	//C19-------------------------------------------------------------------------------------------------------------19
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,
	//C20-------------------------------------------------------------------------------------------------------------20			
	0x00,		0x00,				0x00,				0x00,				0x00,			0x00,	
	//===============
	0,0
}
};


/****************************************************************************************/