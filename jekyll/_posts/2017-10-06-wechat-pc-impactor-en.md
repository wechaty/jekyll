---
title: Research and Sharing on WeChat PC Version Hook
author: h4dex
categories: hacking
tags:
  - code
  - hook
  - news
  - ecosystem
image: /assets/2017/h4dex-inject.webp
excerpt: >
  Technical exploration of hooking WeChat PC version through DLL injection, including code samples for message interception, contact list reading, and profile extraction using Version.dll hijacking.
---

![Wechat Windows Impactor](/assets/2017/h4dex-inject.webp)

Because some friends may find the Easy Language code a bit strange - if you haven't encountered it before, it's not that intuitive. So I changed it to cpp code for review. Due to hasty writing, I hope everyone can point out errors. Thank you very much!

Thanks to Easy Language JingYi Forum members (xdssoft, 恨不能遗忘, gh0st少主) for sharing open source code for reference!

> Preparation:

```text
PEid, Ollydbg, IDA pro, CheatEngine, DLL Auto-Injection Tool, WeChat PC Version 2.4.1.37/79
```

## Research and Sharing on WeChat PC Version Hook

### HOOK Injection Class hookinject.h

> This example uses Version.dll

Because version.dll is loaded before WeChatWin.dll

version.dll is a Windows NT system and above version detection application program interface related file. Here we use this not very necessary DLL to simulate injection.

First, we need to load the real Version.dll

```cpp
///
/// TODO: Install our fake Version.Dll
///

class hookInject {

    public:

    const DLL_PROCESS_DETACH = 0    // Process unload, system views all DLL file images currently mapped to process space
    const DLL_PROCESS_ATTACH = 1    // Process map, system views all DLL file images currently mapped to process space
    const DLL_THREAD_ATTACH = 2     // Thread map
    const DLL_THREAD_DETACH = 3     // Thread unload
    const DLL_PROCESS_VERIFIER = 4  // Process change, system views all DLL file images currently mapped to process space
    const WM_COPYDATA =0x4A         //

    int lib = 0;
    int GetFileVersionInfoA;
    int GetFileVersionInfoByHandle;
    int GetFileVersionInfoExW;
    int GetFileVersionInfoSizeA;
    int GetFileVersionInfoSizeExW;
    int GetFileVersionInfoSizeW;
    int GetFileVersionInfoW;
    int VerFindFileA;
    int VerFindFileW;
    int VerInstallFileA;
    int VerInstallFileW;
    int VerLanguageNameA;
    int VerLanguageNameW;
    int VerQueryValueA;
    int VerQueryValueW;

    BOOL inst_VersionLib(){

    lib = LoadLibraryA ("C:\windows\system32\Version.dll");

    if(lib == 0){
        // Failed to load, return 0, injection failed!
        return FALSE;
    }

        GetFileVersionInfoA = GetProcAddress(lib,"GeFileVersionInfoA");
        if(GetFileVersionInfoA = 0){
            ::FreeLibrary(lib)
            return FALSE;
        }

        //*
        Other functions also need to be written similarly... Check the real Version dynamic library
        When calling, the memory address where each function is located. Otherwise it may cause a crash!!
        FARPROC GetProcAddress(
            HMODULE hModule, // DLL module handle
            LPCSTR lpProcName // Function name
        );

        *//

        VerQueryValueW = GetProcAddress (lib,"VerQueryValueW");
        if(VerQueryValueW = 0){
            ::FreeLibrary (lib)
            return FALSE;
        }

        return TRUE;     // If all
    }

    // Next is to fake all function calls

    int GetFileVersionInfoA(int i,int j,int k,int q){
        return Jmp(GetFileVersionInfoA,i,j,k,q);
    }

    /// ... Others, same principle

    int Jmp(int addr ,int i = NULL,int j = NULL, int k = NULL,int q = NULL,int w = NULL,int e = NULL,int r = NULL,int t = NULL,int y = NULL,int u = NULL,int o = NULL,int a = NULL,int s = NULL,int d = NULL){
        return _Jmp(addr,i,j,k,q,w,e,r,t,y,u,i,o,a,s,d);
    }

    int _Jmp(*p ,int i,int j, int k,int q,int w,int e,int r,int t,int y,int u,int o,int a,int s,int d){
        __asm{
            LEAVE;              // Clear stack
            POP EAX;            // Push EAX back to stack
            XCHG [ESP],EAX;     // Data exchange
            JMP EAX;            // Jump to eax register
        }
        return 0;
    }

}

```

### Application Injection Class Impactor.h

```cpp
class Impactor{
    public:

    static int baseAddr = 0; // Initialize 0 means none!

    void GetBaseAddress(){

        HANDLE hSnapShot;
        int last;
        string m_Module;
        stringstream ss;
        MODULEENTRY32 buffer; //struct

        while(baseAddr = 0){
            hSnapShot = ::CreateToolhelp32Snapshot(8,GetCurrentProcessId());              // Create system snapshot
            buffer.dwSize = 0x224; // Initialize buffer size 548
            //buffer.dwSize = sizeof(buffer); Check size

            last = ::Module32First(hSnapShot,&buffer);

            while(last !=0){

                // m_last = boost::lexical_cast<string>(buffer.szModule) //ANSI -> string
                ss<<buffer.szModule;
                ss>>m_Module;

                if(m_Module =="WeChatWin.dll"){
                    baseAddr = buffer.modBaseAddr
                    break;
                }
                last = ::Module32Next(hSnapShot,buffer);
            }
            CloseHandle(hSnapShot);
            sleep(50);

        }
    }

    ///
    /// Get send/receive type and content, equivalent to WxSync
    ///
    /// param - using int because they are all pointer forms~
    ///
    ///
    void GetSyncType (int msg,int wxid,int type){

        /*
        string str;
        int len=str.size();
        const char *pstr = str.c_str();
        for (int i=0;i<len;i++){
            (short)*pstr++;
        }
        */

        //const unsigned char *buf;

        /* There is an error here~~~ see the original version
        Extract address memory pointer 3000 bytes length character array (string)
        Pass to global variable SyncType
        */

    }

}

```

### Self Info Retrieval GetProfile.h

```cpp

class GetProfile{
    CALLBACK wxAlias;
    CALLBACK wxNickName;
    CALLBACK wxId;

    void GetProfile(){

        // callback method to get the following
        // see Easy Language version code

        // Three pointer addresses are respectively
        // 0x169fc9
        // 0x2db500
        // 0x2db695

        /*
        ;// CALL to get WeChat ID and nickname
        PUSHAD
        CALL 00000006
        POPAD

        ;// CALL to get WXID
        PUSHAD
        PUSH DWORD PTR [ESP+20]
        CALL 0000000A
        POPAD
        */
    }

    void GetNickName(){
        __asm{
            MOV [EBP-4],ECX
        }
        // Get 100 bytes size data address which is WeChat ID, needs Unicode conversion
    }

    void GetWxAlias(){
        __asm{
            MOV [EBP-4],EAX;
        }
        // Get 100 bytes size data address which is WeChat ID
        // Phone number can also be extracted simultaneously. Reserve 30 bytes of memory space

        ReadProcessMemory(-1,baseAddr+0xE2EE20,手机号,30,0);
    }

    void GetWxId(int wxid){
        // Get 100 bytes size data address based on WXID pointer which is wxid
    }

}
```

### Contact Reading (List) Class GetContact.h

```cpp
class GetContact{
    void GetContactList(){

        // Method is similar to above
        // 0x30c820   WXID
        // 0x30c839   WeChat ID
        // 0x30c8a2   Remark
        // 0x30c8b8   Nickname

        /*
        ;CALL
        PUSHAD
        CALL 00000006
        POPAD
        */

    }

    // Get WeChat ID
    void GetAlias(){
        /*
        MOV [EBP-4],EAX
        */
    }

    // Get avatar
    void GetAvatar(){
        /*
        MOV [EBP-4],EAX
        */

    }

    // Get nickname
    void GetNickName(){
        /*
        MOV [EBP-4],EAX
        */
    }

    // Get remark name
    void GetRemarkName(){
        /*
        MOV [EBP-4],EAX
        */
    }

    // Get WXID
    void GetWxid(){
        /*
        MOV [EBP-4],EAX
        */
        // Need 1000 bytes address size
        // Traverse
    }

}
```

### Injection Execution Class WechatWatchDog.cpp

```cpp
#include "stdafx.h"  
#include <cstdio>
#include <iostream>  
#include <string>
#include <vector>  
#include <Windows.h>
#include "impactor.h"
#include "hookinject.h"
#include "GetProfile.h"
#include "GetContact.h"

using namespace std;
int _tmain(int argc, _TCHAR* argv[]){
    hookInject::inst_VersionLib();
}

void hook_install(){

    CALLBACK Hook_Get_Type_CallBack;
    CALLBACK Sync_CallBack;         //User Msg
    CALLBACK Collect_CallBack;      //Image

    Impactor::GetBaseAddress();
    GetProfile::GetProfile();
    GetContact::GetContactList();

    // Add offset 0x237A78 based on base address
    // (WeChat base address + offset, memory data modification method, execution method pointer, offset)
    Hook_Get_Type_CallBack.Install(baseAddr + 0x237A78 ,&_asmGetTypeCall,&Impactor::GetSyncType, *GetSyncType,0x11);

    /*
    PUSHAD
    PUSH EAX
    PUSH DWORD PTR [ESP+548]
    PUSH DWORD PTR [ESP+4AC]
    CALL 00000015
    POPAD
    */

    // Add offset 0x1412D7 based on base address
    Sync_CallBack.Install(baseAddr + 0x1412D7,&_asmGetSyncCall, *GetSync,0x7);

    /*
    PUSHAD
    PUSH EAX
    MOV EAX,[EDI+4C]
    PUSH EAX
    CALL 0000000B
    POPAD
    */

    void _asmGetTypeCall(){
        __asm{
            PUSHAD
            PUSH EAX
            PUSH DWORD PTR [ESP+548]
            PUSH DWORD PTR [ESP+4AC]
            CALL 00000015
            POPAD
        }
    }

    void _asmGetSyncCall(){
        __asm{
            PUSHAD
            PUSH EAX
            MOV EAX,[EDI+4C]
            PUSH EAX
            CALL 0000000B
            POPAD

        }

    }

    void SendCollectImg(*SendCollectImg){

        // Monitor collected image sending
        // Can also put machine images in memory and send based on address~

        // Release CALL

    }

    void SendUserAndMsg(int Msg,int User){
        // Equivalent to SYNC message monitoring!

        /*Infinite loop to check if 10000 bytes address has content, convert to Ansi
        Check if content header is a list array member, if it contains @chatroom it's a group

        Output print or pass to external program via socket~~
        */
    }

}
```

### DLLMain.cpp

```text
Omitted
```

### Postscript

There's a set of DLL dynamic auto-injection source code which is very good~

Attachments:
WeChat PC Hook Easy Language Source Code (3 sets in total)
Includes etcp.dll source code, compiled with VS2013

```text
CALLBACK class - because it's not disclosed in the original code, it calls other developers' ecom (equivalent to integrable Com components/Lib)

So I'm not very clear how to implement this...

Due to my limited ability, everyone is welcome to jointly research and participate in supplementing ~

Thank you!

```

Download: [Download Src](/assets/2017/wechat-windows-impactor-src.zip)

Complete download address: Including WeChat `2.4.5.73` installation package, no WeChat `2.4.1.79`

Link: [download full package](http://pan.baidu.com/s/1hsEeDoC)   Password: wttk

Thanks to @huan for the invitation.

> h4dex, October 6, 2017

---

> 本文也有[中文版本](/2017/10/06/wechat-pc-impactor/)。
