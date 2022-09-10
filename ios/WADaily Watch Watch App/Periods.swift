//
//  Periods.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/20/22.
//

import Foundation
import SwiftUI

var period:Int = -2

var nPeriod = 0
var pPeriod = 0

func setPeriods(schedule:Array<Any>) {
    
    let time = NSDate()
    let timeFormatter = DateFormatter()
    timeFormatter.dateFormat = "HHmm"
    let stringDate:Int = Int(timeFormatter.string(from: time as Date))!
    
    guard schedule.isEmpty else {
        for (index, per) in schedule.enumerated() {
            var startTime = (per as! ScheduleItem).startTime
            let chars: Set<Character> = [" ", ":"]
            startTime.removeAll(where: { chars.contains($0) })
            if startTime.contains("AM") {
                startTime.removeLast(2)
            }else{
                startTime.removeLast(2)
                if Int(startTime)! < 1200 {
                    startTime = String(Int(startTime)!+1200)
                }
            }
            var endTime = (per as! ScheduleItem).endTime
            endTime.removeAll(where: { chars.contains($0) })
            if endTime.contains("AM") {
                endTime.removeLast(2)
            }else{
                endTime.removeLast(2)
                if Int(endTime)! < 1200 {
                    endTime = String(Int(endTime)!+1200)
                }
            }
            
            if stringDate >= Int(startTime)! && stringDate < Int(endTime)! + 5{
                period = Int(index)
                
                if period + 1 >= schedule.count {
                    nPeriod = -2
                }else{
                    nPeriod = period + 1
                }
                if period - 1 < 0 {
                    pPeriod = -2
                }else{
                    pPeriod = period - 1
                }
            }else if stringDate < Int(startTime)!{
                period = 0
                pPeriod = -2
                nPeriod = 1
            }else{
                continue
            }
            break
        }
        return
    }
    print("schedule is empty")
}
