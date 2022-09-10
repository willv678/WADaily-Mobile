//
//  FullScheduleView.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/23/22.
//

import SwiftUI

struct FullScheduleView: View {
    @State private var schedules = [ScheduleGroup]()
    @State var periods:[Periods] = []
    @ObservedObject var variables: Variables
    @Environment(\.scenePhase) var scenePhase;
    
    var body: some View {

        if variables.name == "NONE" {
            Image("booked")
                .resizable()
                .aspectRatio(contentMode: .fit)
        }else{
            GeometryReader { geometry in
                ScrollViewReader{scrollViewReader in
                    List{
                        ForEach(periods, id: \.id) { per in
                            Group {
                                HStack{
                                    Text(per.name)
                                        .font(.system(size: 13))
                                        .bold()
                                    Spacer()
                                    VStack{
                                        Text(per.startTime)
                                        Text(per.endTime)
                                    }.font(.system(size: 12))
                                }
                            }
                        }
                    }.onAppear() {
                        withAnimation {
                            print("hi")
                            scrollViewReader.scrollTo(period)
                        }
                    }
                }
            }
            .onAppear(){
                apiCall().getSchedule { (schedules) in
                    self.schedules = [schedules]
                    guard schedules.schedule.count != 0 else { return }
                    for i in 0...schedules.schedule.count-1{
                        periods.append(Periods(name: schedules.schedule[i].name, index: i, startTime: schedules.schedule[i].startTime, endTime: schedules.schedule[i].endTime))
                    }
                }
            }
            .onChange(of: scenePhase) { newPhase in
                if newPhase == .active {
                    apiCall().getSchedule { (schedules) in
                        self.schedules = [schedules]
                        guard schedules.schedule.count != 0 else { return }
                        for i in 0...schedules.schedule.count-1{
                            periods.append(Periods(name: schedules.schedule[i].name, index: i, startTime: schedules.schedule[i].startTime, endTime: schedules.schedule[i].endTime))
                        }
                    }
                }
            }
        }
    }
}

struct FullScheduleView_Previews: PreviewProvider {
    static var previews: some View {
        FullScheduleView(variables: Variables())
    }
}
