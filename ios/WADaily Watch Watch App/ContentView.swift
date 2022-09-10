//
//  ContentView.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/13/22.
//

import SwiftUI

struct ContentView: View {
    
    @Environment(\.scenePhase) var scenePhase
    
    @State private var schedules = [ScheduleGroup]()
    @StateObject var variables = Variables()
    
    var body: some View {
        NavigationView{
            GeometryReader { geometry in
                VStack{
                    Spacer()
                        .frame(height: 28.0)
                    Text(variables.friendlyName)
                        .font(.title)
                        .fontWeight(.bold)
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)
                    Spacer()
                        .frame(height: 10.0)
                    NavigationLink(destination: FullScheduleView(variables: variables)) {
                        VStack{
                            HStack{
                                VStack{
                                    Text(variables.prevPeriod)
                                        .font(.system(size: 14))
                                    Text(variables.prevStart + variables.pto + variables.prevEnd)
                                        .font(.system(size: 10))
                                }
                            }.padding(.bottom, 5.0)
                            HStack{
                                VStack{
                                    if !variables.isHidden {
                                        Image("booked")
                                            .resizable()
                                            .frame(width: 55, height: 55)
                                    }
                                    Text(variables.currentPeriod)
                                        .font(.system(size: 20))
                                    Text(variables.currentStart + variables.to + variables.currentEnd)
                                        .font(.system(size: 13))
                                }
                            }.padding(.bottom, 5.0)
                            HStack{
                                VStack{
                                    Text(variables.nextPeriod)
                                        .font(.system(size: 14))
                                    Text(variables.nextStart + variables.nto + variables.nextEnd)
                                        .font(.system(size: 10))
                                }
                            }
                        }
                    }
                    Spacer()
                        .frame(height: 10.0)
                }.frame(width: geometry.size.width, height: geometry.size.height)
            }.ignoresSafeArea()
            .onAppear() {
                apiCall().getSchedule { (schedules) in
                    self.schedules = [schedules]
                    variables.friendlyName = schedules.friendlyName
                    variables.name = schedules.name
                    
                    
                    setPeriods(schedule: schedules.schedule)
                    variables.periodNum = String(period)
                    
                    if period == -2 {
                        if variables.name == "NONE" {
                            variables.isHidden = false
                        }else{
                            variables.isHidden = true
                        }
                        variables.currentPeriod = ""
                        variables.nextPeriod = ""
                        variables.prevPeriod = ""
                        variables.to = ""
                        return
                    }else{
                        variables.isHidden = true
                        
                        variables.currentPeriod = schedules.schedule[period].name
                        variables.currentStart = schedules.schedule[period].startTime
                        variables.currentEnd = schedules.schedule[period].endTime
                        variables.to = " - "
                                                
                        if pPeriod == -2 {
                            variables.prevPeriod = ""
                            variables.prevStart = ""
                            variables.prevEnd = ""
                            variables.pto = ""
                        }else{
                            variables.prevPeriod = schedules.schedule[pPeriod].name
                            variables.prevStart = schedules.schedule[pPeriod].startTime
                            variables.prevEnd = schedules.schedule[pPeriod].endTime
                            variables.pto = " - "
                        }
                        if nPeriod == -2 {
                            variables.nextPeriod = ""
                            variables.nextStart = ""
                            variables.nextEnd = ""
                            variables.nto = ""
                        }else{
                            variables.nextPeriod = schedules.schedule[nPeriod].name
                            variables.nextStart = schedules.schedule[nPeriod].startTime
                            variables.nextEnd = schedules.schedule[nPeriod].endTime
                            variables.nto = " - "
                        }
                    }
                }
            }
            .onChange(of: scenePhase) { newPhase in
                if newPhase == .active {
                    apiCall().getSchedule { (schedules) in
                        self.schedules = [schedules]
                        variables.friendlyName = schedules.friendlyName
                        variables.name = schedules.name
                        
                        setPeriods(schedule: schedules.schedule)
                                                
                        if period == -2 {
                            if variables.name == "NONE" {
                                variables.isHidden = false
                            }else{
                                variables.isHidden = true
                            }
                            variables.currentPeriod = ""
                            variables.nextPeriod = ""
                            variables.prevPeriod = ""
                            variables.to = ""
                            return
                        }else{
                            variables.isHidden = true
                            
                            variables.currentPeriod = schedules.schedule[period].name
                            variables.currentStart = schedules.schedule[period].startTime
                            variables.currentEnd = schedules.schedule[period].endTime
                            variables.to = " - "
                            
                            if pPeriod == -2 {
                                variables.prevPeriod = ""
                                variables.prevStart = ""
                                variables.prevStart = ""
                                variables.pto = ""
                            }else{
                                variables.prevPeriod = schedules.schedule[pPeriod].name
                                variables.prevStart = schedules.schedule[pPeriod].startTime
                                variables.prevEnd = schedules.schedule[pPeriod].endTime
                                variables.pto = " - "
                            }
                            if nPeriod == -2 {
                                variables.nextPeriod = ""
                                variables.nextStart = ""
                                variables.nextEnd = ""
                                variables.nto = ""
                            }else{
                                variables.nextPeriod = schedules.schedule[nPeriod].name
                                variables.nextStart = schedules.schedule[nPeriod].startTime
                                variables.nextEnd = schedules.schedule[nPeriod].endTime
                                variables.nto = " - "
                            }
                        }
                    }
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
